class Tracker {
  constructor() {
    this.buffer = [];
    this.lastSendTime = null;
    setInterval(() => {
      if (this.buffer.length) {
        this.sendBufferToServer();
      }
    }, 1000);
  }

  track(event, ...args) {
    const eventValues = {
      event,
      tags: [...args],
      url: window.location.href,
      title: document.title,
      ts: new Date().toISOString(),
    };
    this.#addToBuffer(eventValues);
  }

  #addToBuffer(event) {
    this.buffer.push(event);

    if (this.buffer.length >= 3) {
      this.sendBufferToServer();
    }
  }

  sendBufferToServer() {
    const bufferToSend = this.buffer;
    this.buffer = [];

    fetch('http://localhost:8001/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracks: bufferToSend }),
    }).catch(() => {
      // return items to buffer in case of problem
      this.buffer = [...this.buffer, bufferToSend];
    });
  }
}

// eslint-disable-next-line no-unused-vars
const tracker = new Tracker();

window.onbeforeunload = function beforeUnload() {
  tracker.sendBufferToServer();
};
