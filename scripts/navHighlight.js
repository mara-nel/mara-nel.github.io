function setActiveTab() {
  let path = window.location.pathname;
  let parts = path.split('/');
  let id;
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
  if (id) {
    document.getElementById(id).classList.add('active-tab');
  }
}

setActiveTab();
