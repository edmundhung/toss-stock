import React from 'react';
import classNames from 'classnames';
import './style.css';

class StockPhotoForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateLength = this.updateLength.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.updatePath = this.updatePath.bind(this);
    this.reset = this.reset.bind(this);

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    const isScanPhoto = this.props.type === "SCAN_PHOTO";

    let defaultState = {
      photoId: '',
      name: '',
      nameError: '',
      file: '',
      path: '',
    };

    if (!isScanPhoto) {
      defaultState = {
        ...defaultState,
        length: '',
        lengthError: '',
        width: '',
        widthError: '',
        height: '',
        heightError: '',
      };
    }

    return defaultState;
  }

  reset() {
    this.setState(
      this.getInitialFormState()
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const isScanPhoto = this.props.type === "SCAN_PHOTO";

    let photo = {
      name: this.state.name.trim(),
      file: this.state.file,
    };

    if (!isScanPhoto) {
      photo = {
        ...photo,
        length: this.state.length.trim(),
        width: this.state.width.trim(),
        height: this.state.height.trim(),
      };
    }

    let isValid = true;
    let nameError;
    let lengthError;
    let widthError;
    let heightError;

    // validation
    if (photo.name === '') {
      isValid = false;
      nameError = 'Name is required.';
    } else if (!isScanPhoto && isNaN(photo.length)) {
      isValid = false;
      lengthError = 'Length must be a number.';
    } else if (!isScanPhoto && photo.length < 0) {
      isValid = false;
      lengthError = 'Length must be positive.';
    } else if (!isScanPhoto && isNaN(photo.width)) {
      isValid = false;
      widthError = 'Width must be a number.';
    } else if (!isScanPhoto && photo.width < 0) {
      isValid = false;
      widthError = 'Width must be positive.';
    } else if (!isScanPhoto && isNaN(photo.height)) {
      isValid = false;
      heightError = 'Height must be a number.';
    } else if (!isScanPhoto && photo.height < 0) {
      isValid = false;
      heightError = 'Height must be positive.';
    }

    if (!isValid) {
      this.setState(() => ({
        submitted: true,
        nameError,
        lengthError,
        widthError,
        heightError,
      }));

      return;
    }

    this.props.onSubmit(photo);
    this.reset();
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
  }

  updateName(event) {
    this.handleChange('name', event.target.value);
  }

  updateLength(event) {
    this.handleChange('length', event.target.value);
  }

  updateWidth(event) {
    this.handleChange('width', event.target.value);
  }

  updateHeight(event) {
    this.handleChange('height', event.target.value);
  }

  updatePath(event) {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        path: reader.result,
      });
    }

    reader.readAsDataURL(file);

  }

  render() {
   const {
     props: {
       type,
     },
     state: {
       submitted,
       name,
       nameError,
       file,
       path,
       length,
       lengthError,
       width,
       widthError,
       height,
       heightError,
     }
   } = this;

    let $imagePreview = null;
    if (path) {
      $imagePreview = (<img src={path} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

   return (
     <form className="clearfix" onSubmit={this.handleSubmit}>
       <div className={classNames('form-group', { 'has-error': submitted && nameError })}>
         <label htmlFor="photo-name">File name of photo:</label>
         <input
           id="photo-name"
           className="form-control"
           type="text"
           value={name}
           onChange={this.updateName}
         />
         <div className="help-block">
           {submitted && nameError}
         </div>
       </div>
       {type === "ID_PHOTO" && (
         <div className={classNames('form-group', { 'has-error': submitted && (lengthError || widthError || heightError)})}>
           <label htmlFor="photo-length">Measurements:</label>
           <div className="row">
             <div className="col-xs-3 no-right-padding">
               <input
                 id="photo-length"
                 className="form-control"
                 type="text"
                 value={length}
                 onChange={this.updateLength}
                 placeholder="Length"
               />
             </div>
             <div className="col-xs-1">
               <p>x</p>
             </div>
             <div className="col-xs-3 no-left-padding no-right-padding">
               <input
                 id="photo-width"
                 className="form-control"
                 type="text"
                 value={width}
                 onChange={this.updateWidth}
                 placeholder="Width"
               />
             </div>
             <div className="col-xs-1">
               <p>x</p>
             </div>
             <div className="col-xs-3 no-left-padding no-right-padding">
               <input
                 id="photo-height"
                 className="form-control"
                 type="text"
                 value={height}
                 onChange={this.updateHeight}
                 placeholder="Height"
               />
             </div>
             <div className="col-xs-1">
               <p>cm</p>
             </div>
           </div>
           <div className="help-block">
             {submitted && lengthError}
           </div>
           <div className="help-block">
             {submitted && widthError}
           </div>
           <div className="help-block">
             {submitted && heightError}
           </div>
         </div>
       )}
       <div className="form-group">
        <label htmlFor="photo-path">Photo path:</label>
        <input
          id="photo-path"
          className="form-control"
          type="file"
          onChange={this.updatePath}
        />
        <div className="imgPreview">
           {$imagePreview}
         </div>
       </div>
       <div className="pull-right">
         <button type="submit" className="btn btn-warning">Submit</button>
         <button type="reset" className="btn btn-default" onClick={this.reset}>Reset</button>
       </div>
     </form>
   );
  }
}

export default StockPhotoForm;
