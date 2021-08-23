function firstRun() {
    let myStorage = window.sessionStorage;
    if (myStorage.getItem('flag') == null) 
    {
        animationScript(); 
        myStorage.setItem('flag', 'true'); 
    } 
}
function animationScript() {
    var link = document.createElement('link'); 
    link.rel = 'stylesheet'; 
    link.type = 'text/css';
    link.href = 'animation.css'; 
    document.getElementsByTagName('HEAD')[0].appendChild(link); 
}
firstRun();
