using UnityEngine;
using UnityEngine.UI;

public class Demo : MonoBehaviour
{
  [SerializeField] private Button _TestButton;

  private void Start()
  {
    _TestButton.onClick.AddListener(OnTestButtonClicked);
  }

  private void OnTestButtonClicked()
  {
    NetworkHelper.SendNameChange("test007x");
  }
}
