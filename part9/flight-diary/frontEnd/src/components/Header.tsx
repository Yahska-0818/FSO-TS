interface HeaderProps {
  title:string;
}

const Header = (props:HeaderProps) => (
  <h1>{props.title}</h1>
)

export default Header;