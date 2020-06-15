const urlHandler = function () {
  
  const detect = () => {
    this.newPath = window.location.href;
    if (this.oldPath === this.newPath) return;
    console.log(`URL changed to: ${this.newPath}`);
    this.oldPath = this.newPath;
    window.parent.postMessage({ path: this.newPath }, 'http://127.0.0.1:8080');
  };

  this.checkPath = setInterval(() => detect(), 100);
}

const iframeRouterClient = new urlHandler();