const TitleItem = ({
  onSubmit,
  className,
  placeholder,
  editTitleHandler,
  title,
  titleRef,
}) => (
  <form onSubmit={onSubmit}>
    <input
      className={className}
      placeholder={placeholder}
      onChange={editTitleHandler}
      autoFocus
      value={title}
      ref={titleRef}
    />
  </form>
);

export default TitleItem;
