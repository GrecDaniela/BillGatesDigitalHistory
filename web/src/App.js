import React, { Component } from "react";
import axios from "axios";
import QRcode from "react-qr-code";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      link: [],
    };
  }

  componentDidMount() {
    this.loadQrcode();
  };

  onInputChange = (event) => {
    const text = event.target.value;
    this.setState({ text: text });
  };

  onCheckboxChange = async (id, event) => {
    const isCompleted = event.target.checked;
    await axios.put("http://localhost:8080/qrcode/" + id, {
     isCompleted: isCompleted,
    });

    await this.loadlink();
  };

  onInputKeyPress = async (event) => {
    if (event.nativeEvent.key === "Enter" && this.state.text !== "") {
      await axios.post("http://localhost:8080/qrcode", {
        link: this.state.text,
      });

      await this.loadQrcode();
      this.setState({ text: "" });
    }
  };

  deleteQrcode = async (id, event) => {
    event.preventDefault();
    await axios.delete("http://localhost:8080/qrcode/" + id);
    await this.loadQrcode();
  };

  loadQrcode = async () => {
    const response = await axios.get("http://localhost:8080/qrcode");
    const link = response.data;
    this.setState({ link: link });

    console.log(link)
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          className="qrcodeInput"
          value={this.state.text}
          name = "link"
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
        />

        <div className="qrcodeContainer">
          {this.state.link.map((Qrcode) => {
            console.log(this.state.link);
             if (Qrcode.link != null) {

            return (
              <div key={Qrcode.id} className="qrcode">
                <QRcode value={Qrcode.link} size={100} />
              </div>
            );
            }
          })}
        </div>
      </div>
    );
  }
}
export default App;