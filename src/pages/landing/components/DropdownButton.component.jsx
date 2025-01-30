import PropTypes from 'prop-types';
import "./DropdownButton.css"

export default function DropdownButton({ label, children }) {
    return (<div className="dropdown">
        <button className="dropbtn">
            {label}
            <i className="bi bi-chevron-down ms-2" style={ {WebkitTextStroke: "1px"} }></i>
        </button>
        <div className="dropdown-content">
            {children}
        </div>
    </div>);
}

DropdownButton.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node
};