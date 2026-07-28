import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    increment,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


// Preis pro Strich
const PREIS_PRO_STRICH = 1.50;


// Firestore Speicherort
const personenRef = collection(
    db,
    "gruppen",
    "standard",
    "personen"
);


// HTML Elemente
const nameInput = document.getElementById("personName");
const addButton = document.getElementById("addBtn");
const liste = document.getElementById("personenListe");


// Personen hinzufügen

addButton.addEventListener("click", async () => {

    const name = nameInput.value.trim();

    if(name === ""){
        alert("Bitte einen Namen eingeben.");
        return;
    }


    await addDoc(personenRef, {

        name: name,

        striche: 0,

        erstellt: serverTimestamp()

    });


    nameInput.value = "";

});


// Enter-Taste funktioniert ebenfalls

nameInput.addEventListener("keydown", (event)=>{

    if(event.key === "Enter"){
        addButton.click();
    }

});



// Live Synchronisierung

onSnapshot(personenRef, (snapshot)=>{


    liste.innerHTML = "";


    snapshot.forEach((eintrag)=>{


        const person = eintrag.data();

        const id = eintrag.id;


        liste.innerHTML += `

        <div class="person">

            <h2>${person.name}</h2>


            <div class="striche">

                ${zeigeStriche(person.striche)}

            </div>


            <div class="info">

                Striche:
                ${person.striche}
                <br>

                Betrag:
                ${(person.striche * PREIS_PRO_STRICH).toFixed(2)} €

            </div>


            <div class="buttons">

                <button class="plus"
                onclick="plus('${id}')">
                    + Strich
                </button>


                <button class="minus"
                onclick="minus('${id}')">
                    - Strich
                </button>


                <button class="pay"
                onclick="abrechnen('${id}',
                '${person.name}',
                ${person.striche})">

                    Abrechnen

                </button>


                <button class="delete"
                onclick="loeschen('${id}')">

                    Löschen

                </button>


            </div>

        </div>

        `;


    });


});



// Bierdeckel-Striche anzeigen

function zeigeStriche(anzahl){

    let text = "";

    for(let i = 1; i <= anzahl; i++){

        text += "| ";

        // Nach fünf Strichen Abstand
        if(i % 5 === 0){

            text += "  ";

        }

    }

    return text || "-";

}




// Strich hinzufügen

window.plus = async function(id){

    await updateDoc(
        doc(db,
        "gruppen",
        "standard",
        "personen",
        id),
        {

            striche: increment(1)

        }
    );

};




// Strich entfernen

window.minus = async function(id){


    await updateDoc(

        doc(db,
        "gruppen",
        "standard",
        "personen",
        id),

        {

            striche: increment(-1)

        }

    );

};




// Abrechnen

window.abrechnen = async function(
    id,
    name,
    striche
){


    const betrag =
    (striche * PREIS_PRO_STRICH)
    .toFixed(2);


    const bestaetigt =
    confirm(
        `${name} muss ${betrag} € bezahlen.\n\nStriche zurücksetzen?`
    );


    if(bestaetigt){


        await updateDoc(

            doc(db,
            "gruppen",
            "standard",
            "personen",
            id),

            {

                striche:0

            }

        );

    }

};




// Person löschen

window.loeschen = async function(id){


    const sicher =
    confirm(
        "Person wirklich löschen?"
    );


    if(sicher){


        await deleteDoc(

            doc(db,
            "gruppen",
            "standard",
            "personen",
            id)

        );

    }

};
