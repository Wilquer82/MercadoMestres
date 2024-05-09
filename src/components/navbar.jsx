/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from '../mercadodemestresmenor.png'
import { Input, Button, Badge, Dropdown, Space, Modal, Table, Watermark, Drawer, Card } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DownOutlined, RightOutlined, ThunderboltOutlined } from '@ant-design/icons';
import './styles.css'
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/cartContext';


const { Search } = Input;
const { Meta } = Card;

export default function NavBar() {

    const { cartItens, setCartItens } = useContext(Context);
    const [totalCart, setTotalCart] = useState(0);




    useEffect(() => {
        if (cartItens.length !== 0) {
            console.log(cartItens);
            console.log(cartItens.length);
            let somaTotal = cartItens.reduce((soma, item) => soma + item.item.total, 0);
            console.log(somaTotal);
            setTotalCart(somaTotal);
        }
    }, [cartItens]);

    const items = [
        {
            label: <h3 style={{ color: "black" }}>Mão de Obra</h3>,
            key: '0',
        },
        {
            label: <ul className="subItem" onClick={() => setOpenModal(true)}>Terceirizaçao <RightOutlined /></ul>,
            key: '1',
        },
        {
            label: <ul className="subItem" onClick={() => setOpenModal(true)}>Temporarios <RightOutlined /></ul>,
            key: '3',
        },
        {
            label: <ul className="subItem">Recrutamento e Seleçao</ul>,
            key: '4',
        },
    ];

    const categories = [
        "Varejo",
        "Bar e Restaurante",
        "Shopping",
        "Industria",
        "Offshore",
        "Construcao Civil",
        "Logistica",
        "Inpeçao e ENDs",
        "Aeroporto",
        "T.I.",
        "Estacionamento",
        "Condominio",
        "Administrativo",
        "Eventos",
        "Operadores de Maquinas",
        "Saude",
        "Energia",
        "Manutençao",
        "Hotelaria",
        "Limpeza"
    ]

    const [openModal, setOpenModal] = useState(false);


    const rows = categories.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 4)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])

    const [openD, setOpenD] = useState(false);
    const [openCheck, setOpenCheck] = useState(false);


    const showDrawer = () => {
        setOpenD(true);
    };
    const onClose = () => {
        setOpenD(false);
    };

    const delItem = (index) => {
        setCartItens(prevState => {
            const novoArray = [...prevState];
            novoArray.splice(index, 1);
            return novoArray;
        });
    }




    return (
        <Watermark content="FoxTailConsulting">
            <div className="navbar">
                <Link to='/' style={{ textDecoration: "none" }}>
                    <img src={logo} alt="MercadoLogo" width={60} />
                </Link>
                <nav style={{ height: "auto", display: "flex", width: "75%", marginLeft: "19%", justifyContent: "space-between", alignItems: "center" }}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space className="item">
                                SERVIÇOS
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    <Modal
                        title=""
                        centered
                        open={openModal}
                        onOk={() => setOpenModal(false)}
                        onCancel={() => setOpenModal(false)}
                        width={1000}
                    >
                        <Table dataSource={rows} pagination={false}>
                            <Table.Column dataIndex="0" key="0" />
                            <Table.Column dataIndex="1" key="1" />
                            <Table.Column dataIndex="2" key="2" />
                            <Table.Column dataIndex="3" key="3" />
                        </Table>
                    </Modal>
                    <ul className="item">COMO FUNCIONA</ul>
                    <ul className="item">CONTATO</ul>
                    <ul className="item">VAGAS</ul>
                    <ul className="item">FRANQUIAS</ul>
                    <ul>
                        <Search
                            placeholder="Pesquise"
                            allowClear
                            //   onSearch={onSearch}
                            style={{
                                width: 150,
                            }}
                        />
                    </ul>
                    <ul>
                        <Button type="primary" icon={<UserOutlined />} >
                            Login
                        </Button>
                    </ul>
                    <ul>
                        <Badge count={cartItens.length}>
                            <Button type="primary" icon={<ShoppingCartOutlined />} onClick={showDrawer} />
                        </Badge>
                    </ul>
                    <Drawer title="Carrinho de Compras" onClose={onClose} open={openD}>
                    <div style={{ padding: "1rem", display: "flex", justifyContent: "space-around", width: "100%", flexDirection:"column", height:"60vh" }}>
                        {cartItens.map((item, index) => (
                            <div key={index} style={{ width: "100%" }}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 250,
                                        backgroundColor:"gray"
                                    }}
                                    // cover={<img alt="example" src={item.image} width={200} />}
                                >   
                                    <Meta style={{ color: "#1451b4" }} title={item.item.tipo} />
                                    {item.item.uteis>0 && <h4>Dias uteis: {item.item.uteis}</h4>}
                                    {item.item.domingos>0 && <h4>Domingos: {item.item.domingos}</h4>}
                                    {item.item.sabados>0 && <h4>Sabados: {item.item.sabados}</h4>}
                                    <h4>Proficionais: {item.item.prof}</h4>
                                    <h4>Obs.: {item.item.observ}</h4>    
                                    <h3 style={{ color: "#f9ca3c", textShadow: "1px 1px 1px red" }}>{Number(item.item.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                                    <h4>Datas {item.item.datas}</h4>    
                                    <br />
                                    <button className="buttonContract" 
                                        onClick={() => delItem(index)}
                                    >EXCLUIR?</button>
                                </Card>
                            </div>
                        ))}
                        <h3>Total do Carrinho: {totalCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                        { totalCart>0 &&
                            <Button size="large" type={"primary"} style={{ width: "90%" }}
                            onClick={() => setOpenCheck(true)}>Contratar Agora<ThunderboltOutlined /></Button>
                        }

                    </div>
                    </Drawer>
                </nav>
                <Modal
                    title="CheckOut"
                    centered
                    open={openCheck}
                    onOk={() => setOpenCheck(false)}
                    onCancel={() => setOpenCheck(false)}
                    width={1000}
                >   
                    {/* {stepOne && */}
                    <div style={{display:"flex", width:"100%", justifyContent:"space-between"}}>
                    <Space direction='horizontal'>
                        <Space direction="vertical" >
                            <h3>Complete seus dados para concluir:</h3>
                            <Input size="large" type="text" placeholder="Nome" />
                            <Input size="large" className="inputNews" type="phone" placeholder="Celular" />
                            <Input size="large" className="inputNews" type="text" placeholder="Empresa" />
                            <Input size="large" className="inputNews" type="text" placeholder="Cnpj" />
                            <Input size="large" className="inputNews" type="email" placeholder="Seu E-mail" />
                            <Input size="large" type="text" placeholder="CEP" />

                        </Space>
                        <Space direction="vertical" style={{paddingTop:"4.1rem"}} >
                            <Input size="large" className="inputNews" type="text" placeholder="Rua" />
                            <Input size="large" className="inputNews" type="text" placeholder="Numero" />
                            <Input size="large" className="inputNews" type="text" placeholder="Complemento" />
                            <Input size="large" className="inputNews" type="text" placeholder="Cidade" />
                            <Input size="large" className="inputNews" type="text" placeholder="Bairro" />
                            <Input size="large" className="inputNews" type="text" placeholder="Estado" />

                        </Space>
                        <Space direction="vertical" >
                        <button
                            className="buttonNewsP"
                            // disabled={disabled}
                            style={{ marginLeft: "5rem",marginTop:"4rem",height: "3rem", width: "10rem", color: "white" }}
                            // onClick={() => {
                            //     stepOne((old)=>!old);
                            //     stepTwo((old)=>!old);
                            // }}
                        >
                            Continuar <RightOutlined style={{ color: "#A1F71A" }} />
                        </button>
                        </Space>


                    </Space>
                    </div>
                </Modal>
            </div>
        </Watermark>
    );
}
