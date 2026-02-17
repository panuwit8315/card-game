public class NetworkHelper
{
  public static void Send(string msg)
  {
    if (WSClient.Instance != null)
      WSClient.Instance.Send(msg);
    else
      UnityEngine.Debug.LogWarning("WSClient instance is not available.");
  }

  // Example method to send a play card message
  public static void SendPlayCard(string cardId)
  {
    string msg = "{\"type\":\"play_card\",\"cardId\":\"" + cardId + "\"}";
    Send(msg);
  }

  public static void SendNameChange(string newName)
  {
    string msg = "{\"type\":\"name_change\",\"newName\":\"" + newName + "\"}";
    Send(msg);
  }
}
