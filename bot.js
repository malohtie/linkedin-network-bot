function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function action(nb) {
    let totalTime = 0;
    let totalInvited = 0;
    let contacts;
    contacts = $("button[data-control-name=invite]") || false;
    if(contacts && contacts.length > 0 ){
      for(let i = 0; i < contacts.length; i++) {
        ms = Math.floor(Math.random() * (20000 - 2000 + 1) + 2000);
        let contact = contacts[i].getAttribute("aria-label").split(" ");
        console.log(`inviting ${contact[1]} ${contact[2]}`);
        contacts[i].click();
        contacts[i].remove();
        totalInvited++;
        await sleep(ms);
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
		if(height != document.body.clientHeight && pages > 0){
			invite(document.body.clientHeight, --pages);
		} else {
      action();
    }
	}, 1500);
}

invite(document.body.clientHeight, 5);
