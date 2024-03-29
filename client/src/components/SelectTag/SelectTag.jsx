import React from 'react';
import CaptureError from '../CaptureError/';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';


const { getTags } = api();

export default class SelectTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      loading: true,
      error: false, 
      errorMessage: ''
    }
  }

  componentDidMount() {
    getTags().then(tags => this.setState({
      tags: ['all', ...tags],
      loading: false
    })).catch(err => this.setState({ error: true, errorMessage: err.message}));
  }

  render () {
    const { tags, loading, error } = this.state;
    const { t } = this.props; 
    if (error) {
      return <CaptureError message="Error fecthing tags" error={error} />
    }
    if (loading) {
      return null;
    }
    const { tag , onChange } = this.props;
    return (
      <div className="select width100">
        <select className="width100" name='tag' value={tag} onChange={onChange}  >
          {tags.map(tagName => {
            return  <option key={tagName} value={tagName}>{tagName}</option>
          })}
        </select>
    </div>
    ) 
  }
}

SelectTag.propTypes = {
  tag: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

