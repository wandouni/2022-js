import { Button, Space, ConfigProvider } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

const InternalRenderer = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [lessLoaded, setLessLoaded] = useState(false);

  function loadScript(src: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head!.appendChild(script);
    });
  }

  const handleThemeChange = (theme: string) => {
    const changeTheme = () => {
      console.log('(window as any)?.less', (window as any)?.less);
      (window as any)?.less?.modifyVars({
        '@bg-color': theme,
      });
    };
    changeTheme();
    // const lessUrl =
    //   'https://gw.alipayobjects.com/os/lib/less/3.10.3/dist/less.min.js';

    // if (lessLoaded) {
    //   changeTheme();
    // } else {
    //   (window as any).less = {
    //     async: true,
    //     javascriptEnabled: true,
    //   };
    //   loadScript(lessUrl).then(() => {
    //     setLessLoaded(true);
    //     changeTheme();
    //   });
    // }
  };

  const switchThemeToDefault = () => {
    // handleThemeChange('#fff');
  };

  const switchThemeToDark = () => {
    // handleThemeChange('#000');
  };

  const modifyContextConfig = (color: string) => {
    ConfigProvider.config({
      theme: { primaryColor: color },
    });
  };

  // TODO: remove switch theme btn
  return (
    <ConfigProvider>
      <div className="container">
        {process.env.NODE_ENV === 'development' && (
          <Space>
            <Button type={'primary'} onClick={switchThemeToDefault}>
              light
            </Button>
            <Button
              type={'primary'}
              onClick={() => modifyContextConfig('#f00')}
            >
              dark
            </Button>
          </Space>
        )}
      </div>
    </ConfigProvider>
  );
});

const Renderer = React.memo(InternalRenderer);

Renderer.displayName = 'Renderer';

export default Renderer;
