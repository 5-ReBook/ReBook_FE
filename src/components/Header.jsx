import HeaderButton from './Common/HeaderButton';
import './Header.css';
import { useLayout } from './Layouts/provider/LayoutProvider';

function Header({ buttonAction }) {
  const { layoutConfig } = useLayout();
  const buttonImages = {
    menu: '/src/assets/images/hamburger.png',
    goBack: '/src/assets/images/left-chevron.png',
    none: null,
  };

  if (layoutConfig.header === false) {
    return null;
  }

  return (
    <header className="header">
      <HeaderButton
        buttonImage={
          layoutConfig.leftButton && buttonImages[layoutConfig.leftButton]
        }
        buttonAction={buttonAction}
      />
      <div className="header_center">REBOOK</div>
      {/*TODO : 로고 이미지로 변경 */}
      <div className="header_right"></div>
    </header>
  );
}

export default Header;
