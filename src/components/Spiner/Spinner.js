import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './Spiner.css'

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

const Spinner = () => {
  return <Spin className="spiner" indicator={antIcon} />
}

export default Spinner
