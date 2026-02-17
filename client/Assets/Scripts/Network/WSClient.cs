using NativeWebSocket;
using System.Text;
using UnityEngine;

public class WSClient : MonoBehaviour
{
  private WebSocket websocket;

  public static WSClient Instance { get; private set; }

  async void Start()
  {
    Instance = this;
    websocket = new WebSocket("ws://localhost:2567");

    websocket.OnOpen += () =>
    {
      Debug.Log("Connected!");
    };

    websocket.OnError += (e) =>
    {
      Debug.LogError("Error: " + e);
    };

    websocket.OnClose += (e) =>
    {
      Debug.Log("Closed!");
    };

    websocket.OnMessage += (bytes) =>
    {
      var message = Encoding.UTF8.GetString(bytes);
      Debug.Log("Received: " + message);
      // Handle incoming messages here, e.g.
    };

    await websocket.Connect();
  }

  public void Send(string msg)
  {
    if (websocket.State == WebSocketState.Open)
    {
      _ = websocket.SendText(msg);
    }
  }

  private async void OnApplicationQuit()
  {
    await websocket.Close();
  }

  void Update()
  {
#if !UNITY_WEBGL || UNITY_EDITOR
    websocket.DispatchMessageQueue();
#endif
  }
}


