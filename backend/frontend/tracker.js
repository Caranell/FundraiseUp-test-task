class Tracker {
  constructor() {
    this.buffer = [];
    this.lastSendTime = null;
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

    this.#sendEventsIfPossible();
  }

  #sendEventsIfPossible() {
    // const currentTime = new Date.now().getTime()
    // const lastAutoSendTime = new Date(this.lastSendTime).getTime()
    // const secondsDiff = (currentTime - lastAutoSendTime) /1000
    if (this.buffer.length >= 3) {
      this.sendBufferToServer();
    }
  }

  sendBufferToServer() {
    const bufferToSend = this.buffer;
    console.log('this.buffer', this.buffer)
    this.buffer = [];
    fetch('http://localhost:8001/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracks: bufferToSend }),
    }).then((res) => {
      console.log('Request complete! response:', res);
    }).catch((err) => {
      console.error(err);
      this.buffer = [...this.buffer, bufferToSend];
    });
  }
}

// eslint-disable-next-line no-unused-vars
const tracker = new Tracker();
window.onbeforeunload = function beforeUnload() {
  tracker.sendBufferToServer();
};
