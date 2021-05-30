function setActiveTab() {
  let path = window.location.pathname;
  console.log(path);
  let parts = path.split('/');
  var id;
  switch(parts[1]) {
    case '':
      id = 'home-link';
      break;
    case 'about':
      id = 'about-link';
      break;
    case 'projects':
      id = 'projects-link';
      break;
  }
  document.getElementById(id).classList.add('active-tab');
}

setActiveTab();
