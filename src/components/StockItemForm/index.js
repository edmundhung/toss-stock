import React from 'react';
import './style.css';

class StockItemForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.updateReceivedDate = this.updateReceivedDate.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateDonor = this.updateDonor.bind(this);
    this.updateCondition = this.updateCondition.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateClassificationNum = this.updateClassificationNum.bind(this);

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    return {
      code: '',
      receivedDate: '',
      description: '',
      donor: '',
      condition: 'good',
      location: '',
      category: '',
      classificationNum: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const code = this.state.code.trim();
    // const receivedDate = this.state.receivedDate.trim();
    const condition = this.state.condition.trim();

    // validation
    if (code === '' || condition === '') {
      return;
    }

    this.props.onSubmit({
      code,
      condition,
    });

    this.setState(this.getInitialFormState());
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
  }

  updateCode(event) {
    this.handleChange('code', event.target.value);
  }

  updateReceivedDate(event) {
    this.handleChange('receivedDate', event.target.value);
  }

  updateDescription(event) {
    this.handleChange('description', event.target.value);
  }

  updateDonor(event) {
    this.handleChange('donor', event.target.value);
  }

  updateCondition(event) {
    this.handleChange('condition', event.target.value);
  }

  updateLocation(event) {
    this.handleChange('location', event.target.value);
  }

  updateCategory(event) {
    this.handleChange('category', event.target.value);
  }

  updateClassificationNum(event) {
    this.handleChange('classificationNum', event.target.value);
  }

  render() {
    const {
      code,
      receivedDate,
      description,
      donor,
      condition,
      location,
      category,
      classificationNum,
    } = this.state;

    return (
      <form className="clearfix" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="stock-code">Code no.:</label>
          <input
            id="stock-code"
            className="form-control"
            type="text"
            value={code}
            onChange={this.updateCode}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-received-date">Date received:</label>
          <input
            id="stock-received-date"
            className="form-control"
            type="date"
            value={receivedDate}
            onChange={this.updateReceivedDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-description">Description (w/ situation):</label>
          <input
            id="stock-description"
            className="form-control"
            type="textarea"
            value={description}
            onChange={this.updateDescription}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-donor">Donated by:</label>
          <input
            id="stock-donor"
            className="form-control"
            type="text"
            value={donor}
            onChange={this.updateDonor}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-condition">Physical conditions:</label>
          <select
            id="stock-condition"
            className="form-control"
            value={condition}
            onChange={this.updateCondition}
          >
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="stock-location">Location:</label>
          <input
            id="stock-location"
            className="form-control"
            type="text"
            value={location}
            onChange={this.updateLocation}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-category">Category:</label>
          <select
            id="stock-category"
            className="form-control"
            value={category}
            onChange={this.updateCategory}
          >
            <optgroup label="行政紙品">
              <option value="AA">點名簿</option>
              <option value="AB">學生手冊</option>
              <option value="AC">學校通告</option>
              <option value="AD">成績表</option>
              <option value="AE">習作/功課</option>
              <option value="AF">試卷</option>
              <option value="AG">校簿</option>
              <option value="AH">信紙</option>
              <option value="AI">筆記</option>
              <option value="AO">其他 (Testimonial……)</option>
            </optgroup>
            <optgroup label="襟章">
              <option value="BA">校章</option>
              <option value="BB">學生領袖襟章</option>
              <option value="BC">學會襟章</option>
              <option value="BD">社襟章</option>
              <option value="BE">班長襟章</option>
              <option value="BF">學生會襟章</option>
              <option value="BO">其他襟章</option>
            </optgroup>
            <optgroup label="証件">
              <option value="CA">卡_職員証</option>
              <option value="CB">卡_學生証</option>
              <option value="CC">卡_借書証</option>
              <option value="CD">卡_影印卡</option>
              <option value="BO">卡_其他</option>
            </optgroup>
            <optgroup label="刊物">
              <option value="LA">修會出版刊物</option>
              <option value="LB">學校出版刊物 (如：和集、校刊、典禮場刊…)</option>
              <option value="LC">學會出版刊物</option>
              <option value="LD">社出版刊物</option>
              <option value="LE">班會出版刊物</option>
              <option value="LF">學生會出版刊物</option>
              <option value="LG">校友會出版刊物</option>
              <option value="LH">家長教師會出版刊物</option>
              <option value="LO">其他出版刊物</option>
            </optgroup>
            <optgroup label="相片">
              <option value="PA">相片_修會活動</option>
              <option value="PB">相片_校內活動</option>
              <option value="PC">相片_校外活動</option>
              <option value="PD">相片_慈雲山區</option>
              <option value="PO">相片_其他</option>
            </optgroup>
            <optgroup label="紀念品">
              <option value="SA">修會製作紀念品</option>
              <option value="SB">學校製作紀念品</option>
              <option value="SC">學會製作紀念品</option>
              <option value="SD">社製作紀念品</option>
              <option value="SE">班會製作紀念品</option>
              <option value="SF">學生會製作紀念品</option>
              <option value="SG">校友會製作紀念品</option>
              <option value="SH">家長教師會製作紀念品</option>
              <option value="SO">其他製作紀念品</option>
            </optgroup>
            <optgroup label="服飾">
              <option value="UA">校服</option>
              <option value="UB">體育服</option>
              <option value="UC">班服</option>
              <option value="UO">其他服飾</option>
            </optgroup>
            <optgroup label="影片">
              <option value="VA">影片_修會活動</option>
              <option value="VB">影片_校內活動</option>
              <option value="VC">影片_校外活動</option>
              <option value="VD">影片_慈雲山區</option>
            </optgroup>
            <optgroup label="其他">
              <option value="OA">獎狀/獎品/獎牌/獎盃</option>
              <option value="OB">紀念冊</option>
              <option value="OC">新聞剪報</option>
              <option value="OD">信件</option>
              <option value="OE">公開刊登繕稿/廣告的文本</option>
              <option value="OF">社歌/紀念歌曲</option>
              <option value="OG">傢俬/傢具/儀器</option>
              <option value="OH">通訊錄</option>
              <option value="OO">其他</option>
            </optgroup>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="stock-classification-number">Classification no.:</label>
          <input
            id="stock-classification-number"
            className="form-control"
            type="text"
            value={classificationNum}
            disabled
          />
        </div>
        <div className="pull-right">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="reset" className="btn btn-default">Reset</button>
        </div>
      </form>
    );
  }
}

export default StockItemForm;
