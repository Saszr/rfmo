import React from 'react';

interface TabsProps {
  children: JSX.Element[];
  defaultActiveKey: string;
  tabBarExtraContent?: React.ReactNode;
  renderAllTabPanes?: boolean;
}

interface TabPaneProps {
  children: JSX.Element;
  tab: string;
  active?: boolean;
  renderAllTabPanes?: boolean;
}

const TabPane = ({ children, active, renderAllTabPanes }: TabPaneProps) => {
  const [visited, setVisited] = React.useState(false);

  React.useEffect(() => {
    if (renderAllTabPanes) {
      setVisited(true);
      return;
    }

    if (active) setVisited(true);
  }, [active]);

  const mergedStyle: React.CSSProperties = {};
  if (!active) {
    mergedStyle.display = 'none';
  }

  return <div style={{ ...mergedStyle }}>{visited && children}</div>;
};

const Tabs = ({
  children,
  defaultActiveKey,
  tabBarExtraContent,
  renderAllTabPanes = false,
}: TabsProps) => {
  const [active, setActive] = React.useState<React.Key>(defaultActiveKey);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', marginBottom: '-2px' }}>
          {React.Children.map(children, (child) => {
            return (
              <div
                style={{
                  color: `${active === child.key ? '#fff' : '#e8e8e8'}`,
                  backgroundColor: `${active === child.key ? '#e8e8e8' : ''}`,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  borderRadius: '6px 6px 0 0',
                  fontSize: '13px',
                  lineHeight: '12px',
                }}
                onClick={() => setActive(child.key!)}
              >
                {child.props.tab}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex' }}>{tabBarExtraContent}</div>
      </div>

      {React.Children.map(children, (child) => {
        const enhancedChild = React.cloneElement(child, {
          code: child.key,
          active: active === child.key,
          renderAllTabPanes,
        });
        return enhancedChild;
      })}
    </div>
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
