import React from 'react';
import classNames from 'classnames';
import './style.css';

class StockItemForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateReceivedDate = this.updateReceivedDate.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateDonor = this.updateDonor.bind(this);
    this.updateCondition = this.updateCondition.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateSign = this.updateSign.bind(this);
    this.updateRemarks = this.updateRemarks.bind(this);
    this.reset = this.reset.bind(this);

    this.state = this.getInitialFormState(props);
  }

  getInitialFormState(props) {
    const { stock } = props;

    const defaultState = {
      submitted: false,
      receivedDate: '',
      receivedDateError: '',
      description: '',
      descriptionError: '',
      donor: '',
      donorError: '',
      condition: '',
      conditionError: '',
      location: '',
      locationError: '',
      category: '',
      categoryError: '',
      classificationNum: '0003',
      sign: 'Pending',
      signError: '',
      remarks: 'N.A.',
      remarksError: '',
    };

    if (stock === null) {
      return defaultState;
    }

    return {
      ...defaultState,
      receivedDate: stock.receivedDate,
      description: stock.description,
      donor: stock.donor,
      condition: stock.condition,
      location: stock.location,
      category: stock.category,
      classificationNum: stock.classificationNum,
      sign: stock.sign,
      remarks: stock.remarks,
    };
  }

  reset() {
    this.setState(
      this.getInitialFormState(this.props)
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const stock = {
      code: this.props.code,
      receivedDate: this.state.receivedDate.trim(),
      description: this.state.description.trim(),
      donor: this.state.donor.trim(),
      condition: this.state.condition.trim(),
      location: this.state.location.trim(),
      category: this.state.category.trim(),
      classificationNum: this.state.category.trim() + this.props.code.trim(),
      sign: this.state.sign.trim(),
      remarks: this.state.remarks.trim(),
    };

    let isValid = true;
    let receivedDateError;
    let descriptionError;
    let donorError;
    let conditionError;
    let locationError;
    let categoryError;
    let signError;
    let remarksError;

    // validation
    if (stock.receivedDate === '') {
      isValid = false;
      receivedDateError = 'Received date is required.';
    } else if (stock.description === '') {
      isValid = false;
      descriptionError = 'Description is required.';
    } else if (stock.donor === '') {
      isValid = false;
      donorError = 'Donor is required.';
    } else if (stock.condition === '') {
      isValid = false;
      conditionError = 'Condition is required.';
    } else if (stock.location === '') {
      isValid = false;
      locationError = 'Location is required.';
    } else if (stock.category === '') {
      isValid = false;
      categoryError = 'Category is required.';
    }

    if (stock.remarks === '') {
      stock.remarks = "N.A.";
    }

    if (!isValid) {
      this.setState(() => ({
        submitted: true,
        receivedDateError,
        descriptionError,
        donorError,
        conditionError,
        locationError,
        categoryError,
        signError,
        remarksError,
      }));

      return;
    }

    this.props.onSubmit(stock);
    this.reset();
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
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

  updateSign(event) {
    this.handleChange('sign', event.target.value);
  }

  updateRemarks(event) {
    this.handleChange('remarks', event.target.value);
  }

  render() {
    const {
      props: {
        code,
        isAdmin,
      },
      state: {
        submitted,
        receivedDate,
        receivedDateError,
        description,
        descriptionError,
        donor,
        donorError,
        condition,
        conditionError,
        location,
        locationError,
        category,
        categoryError,
        sign,
        signError,
        remarks,
        remarksError,
      },
    } = this;

    return (
      <form className="clearfix" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="stock-code">Code no.:</label>
          <div className="form-control-static">
            {code}
          </div>
        </div>
        <div className={classNames('form-group', { 'has-error': submitted && receivedDateError })}>
          <label htmlFor="stock-received-date">Date received:</label>
          <input
            id="stock-received-date"
            className="form-control"
            type="date"
            value={receivedDate}
            onChange={this.updateReceivedDate}
          />
          <div className="help-block">
            {submitted && receivedDateError}
          </div>
        </div>
        <div className={classNames('form-group', { 'has-error': submitted && descriptionError })}>
          <label htmlFor="stock-description">Description (w/ situation):</label>
          <textarea
            id="stock-description"
            className="form-control"
            value={description}
            onChange={this.updateDescription}
          ></textarea>
          <div className="help-block">
            {submitted && descriptionError}
          </div>
        </div>
        <div className={classNames('form-group', { 'has-error': submitted && donorError })}>
          <label htmlFor="stock-donor">Donated by:</label>
          <input
            id="stock-donor"
            className="form-control"
            type="text"
            value={donor}
            onChange={this.updateDonor}
          />
          <div className="help-block">
            {submitted && donorError}
          </div>
        </div>
        <div className={classNames('form-group', { 'has-error': submitted && conditionError })}>
          <label htmlFor="stock-condition">Physical conditions:</label>
          <select
            id="stock-condition"
            className="form-control"
            value={condition}
            onChange={this.updateCondition}
          >
            <option value="" disabled>Please select</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <div className="help-block">
            {submitted && conditionError}
          </div>
        </div>
        <div className={classNames('form-group', { 'has-error': submitted && locationError })}>
          <label htmlFor="stock-location">Location:</label>
          <input
            id="stock-location"
            className="form-control"
            type="text"
            value={location}
            onChange={this.updateLocation}
          />
          <div className="help-block">
            {submitted && locationError}
          </div>
        </div>
        <div className={classNames('form-group', { 'has-error': submitted && categoryError })}>
          <label htmlFor="stock-category">Category:</label>
          <select
            id="stock-category"
            className="form-control"
            value={category}
            onChange={this.updateCategory}
          >
            <option value="" disabled>Please select</option>
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
          <div className="help-block">
            {submitted && categoryError}
          </div>
        </div>
        {isAdmin &&
          <div className={classNames('form-group', { 'has-error': submitted && signError })}>
            <label htmlFor="stock-sign">Sign:</label>
            <input
              disabled={!this.props.stock}
              id="stock-sign"
              className="form-control"
              type="text"
              value={sign}
              onChange={this.updateSign}
            />
            <div className="help-block">
              {submitted && signError}
            </div>
          </div>
        }
        <div className={classNames('form-group', { 'has-error': submitted && remarksError })}>
          <label htmlFor="stock-remarks">Remarks:</label>
          <textarea
            id="stock-remarks"
            className="form-control"
            value={remarks}
            onChange={this.updateRemarks}
          ></textarea>
          <div className="help-block">
            {submitted && remarksError}
          </div>
        </div>
        <div className="pull-right">
          <button type="submit" className="btn btn-warning">Submit</button>
          <button type="button" className="btn btn-default" onClick={this.reset}>Reset</button>
        </div>
      </form>
    );
  }
}

export default StockItemForm;
