Modifiche al progetto: 

Come concordato, subito dopo il test a risposta multipla, mi sono concentrato a sviluppare la parte riguardante typescript,
ma ho apportato alcune modifiche anche ai file .css e .html

Nello specifico, innanzitutto, nel progetto ServiceAPI ho inserito dei nuovi attributi alle classi Student e Teacher nel file Student.cs
e creato le funzioni che permettono la get-put-post-delete anche per i "Teachers" nel file ServiceApiController.cs

Nel progetto SuperCoolApp avendo preso visione e capito come era stato implementato il metodo putData() ho preferito cambiare la gestione del 
bottone (Elimina) creando un metodo Delete(id: number) che si occupa solo di eliminare l'elemento della tabella in base all'id.

Ho aggiunto un nuovo component (teachers) che mi legge i valori di un’altra tabella presente nel database corso, la quale prevede come per la 
component student di inserire, modificare e cancellare gli elementi della tabella.

Infine ho un po' modificato i file .html e .css cercando di personalizzare la grafica.
	
	
	
	