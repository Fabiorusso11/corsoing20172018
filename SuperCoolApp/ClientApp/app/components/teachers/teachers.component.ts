import { Component, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
    public teachers: Teacher[];
    public selectedTeacher: Teacher | undefined;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.refreshData();
    }

    async refreshData() {
        this.http.get(this.baseUrl + 'api/teachers').subscribe(result => {
            let teacherList = [];

            for (let teach of result.json() as Teacher[]) {

                let teacher = new Teacher();
                teacher.id = teach.id;
                teacher.name = teach.name;
                teacher.surname = teach.surname;
                teacher.insegnamento = teach.insegnamento;
                teacher.dateOfBirth = teach.dateOfBirth;
                teacher.hasChanges = false;
                teacherList.push(teacher);
            }

            console.log("ok");

            this.teachers = teacherList;

            this.selectTeacher();
        }, error => console.error(error));
    }


    selectTeacher(): void {

        this.selectedTeacher = undefined;

        for (let teach of this.teachers) {
            if (teach.deleted == false) {
                this.selectedTeacher = teach;
                break;
            }

        }
    }

    Delete(id: number): void {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = this.baseUrl + 'api/teachers?id=' + id;
        this.http.delete(url, { headers: headers }).subscribe(data => {
            this.refreshData();
        }, error => console.error(error));
    }


    async putData(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let serverCalls = [];

        for (let teacher of this.teachers) {
            if (teacher.hasChanges == true || teacher.deleted) {

                let json = JSON.stringify(teacher.toJSON());

                if (!teacher.id) { //create
                    if (!teacher.deleted) {
                        let call = this.http.put(this.baseUrl + 'api/teachers', json, { headers: headers });
                        serverCalls.push(call);
                    }
                }
                else {
                   /* if (teacher.deleted) {
                        let url = this.baseUrl + 'api/teachers?id=' + teacher.id;
                        let call = this.http.delete(url, { headers: headers });
                        serverCalls.push(call);
                    }
                    else {*/
                        let call = this.http.post(this.baseUrl + 'api/teachers', json, { headers: headers });
                        serverCalls.push(call);
                    //}

                }
            }
        }
        Observable.forkJoin(serverCalls)
            .subscribe(data => {
                this.refreshData();
            }, error => console.error(error));


    }

    onSelect(teacher: Teacher): void {

        if (teacher.deleted == false) {
            this.selectedTeacher = teacher;
        }
    }

    addNewTeacher(): void {
        this.selectedTeacher = new Teacher();
        this.selectedTeacher.hasChanges = true;
        this.teachers.push(this.selectedTeacher);
    }

    async saveChanges(): Promise<void> {
        await this.putData();
        //console.log("update completed");
        //await this.refreshData();
    }

    delete(teacher: Teacher): void {
        teacher.deleted = true;
        this.selectTeacher();
    }
}

class Teacher {

    id: number;
    private _name: string = "";
    private _surname: string = "";
    private _insegnamento: string = "";
    private _dateOfBirth: Date;
    public hasChanges: boolean;
    public deleted: boolean = false;

    get name(): string {
        return this._name;
    }
    set name(n: string) {
        this._name = n;
        this.hasChanges = true;
        console.log("set name");
    }

    get surname(): string {
        return this._surname;
    }
    set surname(n: string) {
        this._surname = n;
        this.hasChanges = true;
        console.log("set surname");
    }

    get insegnamento(): string {
        return this._insegnamento;
    }

    set insegnamento(n: string) {
        this._insegnamento = n;
        this.hasChanges = true;
        console.log("set insegnamento");
    }

    get dateOfBirth(): Date {
        return this._dateOfBirth;
    }

    set dateOfBirth(d: Date) {
        this._dateOfBirth = d;
        this.hasChanges = true;
        console.log("set dateOfBirth");
    }

    public toJSON() {
        return {
            id: this.id,
            name: this._name,
            surname: this._surname,
            insegnamento: this._insegnamento,
            dateOfBirth: this._dateOfBirth,
        };
    };
}
