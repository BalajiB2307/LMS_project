import {
  colorTextNeutral500,
  colorTextNeutral250
} from '@ellucian/react-design-system/core/styles/tokens';

export const Styles = {
  drawerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    gap: '1rem'
  },
  infoText: {
    color: colorTextNeutral500
  },
  shrinkContainer: {
    flexShrink: 1
  },
  templateCard: {
    margin: '1rem',
    display: 'flex',
    width: '120px',
    height: '120px',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px solid ${colorTextNeutral250}`,
    borderRadius: '5px',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  templatesWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
};
