import PropTypes from "prop-types";

const Input = ({ type, placeholder, onChange, value, classes, label, onBlur, autoFocus = false }) => {
    const baseClasses =
        "my-1 md:my-2 p-1 md:p-2 focus:outline-none focus:ring focus:ring-1 ring-honey-yellow-light border border-honey-yellow-light rounded-md text-oxford-blue placeholder-slate-400 transition ease-in-out duration-300";

    const combinedClasses = `${baseClasses} ${classes ? classes : ""}`;

    return (
        <>
            {label && <label className="block text-sm font-medium text-slate-700" htmlFor={label}>{label}</label>}
            <input
                className={combinedClasses}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                id={label}
                onBlur={onBlur}
                autoFocus={autoFocus}
            />
        </>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    classes: PropTypes.string,
    label: PropTypes.string,
};

export default Input;
