// used for electron IPC
declare interface Window {
  electron: {
    send: function;
    sendSync: function;
    receive: function;
    receiveOnce: function;
    invoke: function;
  };
}
