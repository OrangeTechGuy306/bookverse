import { Tabs, TabsProps } from 'antd';


interface TabsLayoutProps{
    items: TabsProps['items']
}


const TabsLayout = ({items}: TabsLayoutProps) => {

  return <Tabs defaultActiveKey="1" items={items}  />

}

export default TabsLayout