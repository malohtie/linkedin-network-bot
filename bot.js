const nb_pages = 5;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function actions(nb) {
    let totalTime = 0;
    let totalInvited = 0;
    let contacts;
    contacts = $("button[data-control-name=invite]") || false; //get all contacts
    if(contacts && contacts.length > 0 ){
      for(let i = 0; i < contacts.length; i++) {
        ms = Math.floor(Math.random() * (20000 - 2000 + 1) + 2000); //get random ms to sleep between 20 seconds and 2
        let contact = contacts[i].getAttribute("aria-label").split(" ");
        console.log(`inviting ${contact[1]} ${contact[2]}`); //write full name
        contacts[i].click(); //click connect button
        contacts[i].remove(); //remove button from the DOM
        totalInvited++;
        await sleep(ms); //wait some time to another invite
        totalTime += ms;
        console.log(`waited ${ms} ms for another invitation`);
      }
    } else {
      console.error("no contact found !");
    }
    console.warn(`FINISHED TOTAL CONTACT INVITED ${totalInvited}, TIME TAKEN ${totalTime}`);
}

async function invite(height, pages){
  console.warn(`Scroll number : ${pages}`);
  scroll(0, document.body.clientHeight);
  setTimeout(function() {
		if(height != document.body.clientHeight && pages > 0){ //scroll
			invite(document.body.clientHeight, --pages);
		} else {
      actions();
    }
	}, 1500);
}
//to run invitation
invite(document.body.clientHeight, nb_pages);
