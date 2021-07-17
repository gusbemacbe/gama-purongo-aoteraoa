// Increase or decrease the text size
// AUmentar ou diminuir o tamanho do texto

var min = 8;
var max = 18;

function changeFontSize(delta) {
  var tags = document.querySelectorAll('p,blockquote');
  for (i = 0; i < tags.length; i++) {
    if (tags[i].style.fontSize) {
      var s = parseInt(tags[i].style.fontSize.replace("px", ""));
    } else {
      var s = 12;
    } if (s != max) {
      s += delta;
    }
    tags[i].style.fontSize = s + "px"
  }
}

function increaseFontSize() {
  changeFontSize(1);
}

function decreaseFontSize() {
  changeFontSize(-1);
}

document.getElementById('increase').onclick = increaseFontSize;
document.getElementById('decrease').onclick = decreaseFontSize;

// Toggle the dark mode
// Ativar o modo escuro

const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

const initialColors = 
{
    color1: getStyle(html, "--color-1"),
    color2: getStyle(html, "--color-2"),
    color8: getStyle(html, "--color-8"),
    color9: getStyle(html, "--color-9"),
    color10: getStyle(html, "--color-10"),
    color11: getStyle(html, "--color-11"),
    color12: getStyle(html, "--color-12"),
    colorHeadings: getStyle(html, "--color-headings"),
}

const darkMode = 
{
    color1: "#121214",
    color2: "#121214",
    color8: "#FFFFFF",
    color9: "#8257E5",
    color10: "#cab2ff",
    color11: "#9466FF",
    color12: "#cab2ff",
    colorHeadings: "#9466FF",
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => 
{
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}

checkbox.addEventListener("change", ({target}) => 
{
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

const isExistLocalStorage = (key) => 
  localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) => 
  localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))

checkbox.addEventListener("change", ({target}) => {
  if (target.checked) {
    changeColors(darkMode) 
    createOrEditLocalStorage('modo','darkMode')
  } else {
    changeColors(initialColors)
    createOrEditLocalStorage('modo','initialColors')
  }
})

if(!isExistLocalStorage('modo'))
  createOrEditLocalStorage('modo', 'initialColors')


if (getValeuLocalStorage('modo') === "initialColors") {
  checkbox.removeAttribute('checked')
  changeColors(initialColors);
} else {
  checkbox.setAttribute('checked', "")
  changeColors(darkMode);
}

// Side navigation

function openNav() 
{
  document.getElementById("SideNav").style.width = "250px";
}

function closeNav() 
{
  document.getElementById("SideNav").style.width = "0";
}

// Modal pop-up

const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) 
{
  trigger.addEventListener("click", function (event) 
  {
    event.preventDefault();

    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    
    const exits = modal.querySelectorAll(".modal-exit");

    exits.forEach(function (exit) 
    {
      exit.addEventListener("click", function (event) 
      {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});
