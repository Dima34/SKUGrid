const blur = document.getElementById("blur");
const header = document.querySelector("header");
const body = document.querySelector("body");
const popups = document.querySelectorAll("[data-popup]")
const popupTriggers = document.querySelectorAll("[data-popupTrigger]")
const closeTriggers = document.querySelectorAll("[data-popupCloseTrigger]")

// Set the data-classlist atribute to popup
popups.forEach(item=>{
	item.setAttribute("data-classlist", item.classList.value)
})

function showBlur() {
  blur.classList.add("active")
}

function hideBlur() {
  blur.classList.remove("active")
}

function blockScroll() {
  body.classList.add("scroll-block")
}

function unblockScroll() {
  body.classList.remove("scroll-block")
}

function closeAll(){

  // Set the default popup classlist
  popups.forEach(el=>{
    el.classList = el.getAttribute("data-classlist")
  })

  popupTriggers.forEach(el=>{
    el.classList.remove("active")
  })
  hideBlur()
  unblockScroll()
}

function toogleMenu(trigger,menuElement, openFunc=()=>{}){
  // That statement allows us to close a mobile catalogue without opening burger(because them are on one button)
  // *if catalogue opened burger button are active and burger arent, so we need to click burger button and don`t 
  //  open the burger, kust close the catalogue, so we check if the button has cative and if it has we close all
  //  popups and dont open the related to button popup
  if(menuElement.classList.contains("active") || trigger.classList.contains("active") ){
    closeAll()
    trigger.classList.remove("active")
		menuElement.classList = menuElement.getAttribute("data-classlist")
    hideBlur()
    unblockScroll();
  } else{
    closeAll()
    openFunc()
    trigger.classList.add("active")
		
		if(trigger.hasAttribute("data-popupCustomClass")){
			menuElement.classList.add(trigger.getAttribute("data-popupCustomClass"))
		}else{
			menuElement.classList.add("active")
		}
    showBlur()
    blockScroll();
  }
}

closeTriggers.forEach(el=>{
  el.addEventListener("click", ()=>{
    closeAll()
  })
})

popupTriggers.forEach(el=>{
  el.addEventListener("click", ()=>{
    if(el.dataset.customopenfunction){
      //  https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string#:~:text=You%20just%20need%20convert%20your,use%20it%20like%20a%20pointer.
      toogleMenu(el,document.querySelector(el.dataset.popuptrigger), window[el.dataset.customopenfunction])
    } else{
      toogleMenu(el,document.querySelector(el.dataset.popuptrigger))
    }
    
  })
})


