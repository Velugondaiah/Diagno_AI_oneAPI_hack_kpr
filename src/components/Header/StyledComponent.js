import Styled from 'styled-components'


export const Sidebar = Styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.isOpen ? '0' : '-290px')}; 
  width: 250px;
  height: 100%;
  background-color: #444;
  padding: 20px;
  transition: right 0.3s ease; 
  z-index: 999;
`;

export const SidebarItem = Styled.div`
  color: white;
  margin: 20px 0;
  cursor: pointer;
`