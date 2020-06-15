window.onpopstate = () => {
  navigate(window.location.pathname);
};

window.addEventListener('click', event => {
  if (!event.target.pathname) return;
  event.preventDefault();
  navigate(event.target.pathname);
  if (event.target.pathname === window.location.pathname) return false;
  window.history.pushState({}, '', event.target.pathname);
  return false;
});

const navigate = path => {
  path = path.split('/');
  if (!routes[`/${path[1]}`]) return navigate('/error');
  const oldIframe = document.querySelector('#root');
  const newIframe = oldIframe.cloneNode();
  newIframe.src = `${routes[`/${path[1]}`]}${path.length > 2 ? '/' + path.slice(2).join('/') : ''}`;
  oldIframe.parentNode.replaceChild(newIframe, oldIframe);
};

document.addEventListener('DOMContentLoaded', () => {
  navigate(window.location.pathname);
});

window.addEventListener('message', event => {
  if (event.origin !== 'http://127.0.0.1:8081') return console.error('postMessage from unknown origin');
  
  let newPath = event.data.path;
  Object.keys(routes).forEach(path => {
    if (newPath.includes(routes[path])) newPath = newPath.replace(routes[path], path);
  });
  
  console.log(newPath);

  window.history.pushState({}, '', newPath);
});