import NavBar from './navbar';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Carousel, Input, Space, Button } from 'antd';
import Pedreiro from '../pedreiro.jpg';
import Logistica from '../logistica.jpg';
import one from '../1.webp';
import two from '../2.webp';
import three from '../3.webp';
import { ReactComponent as Pix } from '../pix.svg';
import { Footer } from 'antd/es/layout/layout';
import { useState } from 'react';
import Contract from './contract';

const carouselItens = [
    { label: "Profissao 1", image: one, valor: "400" },
    { label: "Profissao 2", image: two, valor: "300" },
    { label: "Profissao 3", image: three, valor: "500" },
    { label: "Profissao 4", image: one, valor: "600" },
    { label: "Profissao 5", image: two, valor: "800" },
]
const { Meta } = Card;
const { TextArea } = Input;



export default function Home() {

//     let reader = new FileReader();
// reader.onloadend = function() {
//   let base64data = reader.result;
//   localStorage.setItem('imageData', base64data);
// }
// reader.readAsDataURL(yourImageFile);


    const [contract, setContract] = useState(false);
    
    function CallContract(img, value, prof){
        localStorage.setItem('imagem', img)
        localStorage.setItem('valor', value)
        localStorage.setItem('profit', prof)
        setContract((old)=>!old)
    }

    return (
        <div style={{ backgroundColor: "#fadd89", width: "100%", height: "auto" }}>
            <NavBar />
            {!contract?
            <>
            <Carousel autoplay infinite={true} style={{paddingTop:"3rem"}}>
                <img src={Pedreiro} style={{cursor:"pointer"}} alt="contrate pedreiro" onClick={() => CallContract("Pedreiro",400, Pedreiro)}/>
                <img src={Logistica} style={{cursor:"pointer"}} alt="contrate ajudante" onClick={() => CallContract("Aux.Logistica",400, Logistica)}/>
            </Carousel>
            <div style={{ padding: "1rem", display: "flex", justifyContent: "space-around", width: "97%" }}>
                {carouselItens.map((item, index) => (
                    <div key={index} style={{ width: "200px" }}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                            }}
                            cover={<img alt="example" src={item.image} width={200} />}
                        >
                            <Meta style={{ color: "#1451b4" }} title={item.label} />
                            <h1 style={{ color: "#f9ca3c", textShadow: "1px 1px 1px red" }}>R$ {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} &nbsp;<Pix /></h1>
                            <br />
                            <button className="buttonContract" onClick={() => CallContract(item.label,item.valor, item.image)}>CONTRATE AGORA <ShoppingCartOutlined /></button>
                        </Card>
                    </div>
                ))}
            </div>
            <div>
                <h2>Solicite um <strong>Orçamento</strong></h2>
                <h3>Entre em contato e garanta mão de obra para qualquer área do seu negócio.</h3>
                <Space direction="vertical" style={{ width: "45%" }}>
                    <Space direction="horizontal" style={{ width: "100%", justifyContent: "space-between" }}>
                        <Input size="large" type="text" placeholder="Nome" style={{ width: "330px" }} />
                        <Input size="large" type="text" placeholder="Sobrenome" style={{ width: "330px" }} />
                    </Space>
                    <Input size="large" className="inputNews" type="phone" placeholder="Celular" />
                    <Input size="large" className="inputNews" type="email" placeholder="E-mail"
                    // onChange={(e) => setEmail(e.target.value)} />
                    />
                    <span>Mensagem</span>
                    <TextArea rows={6} style={{ resize: "none" }} placeholder='Preciso de profissionais de...' />
                    <Button style={{ margin: "1rem 0" }}>Enviar</Button>
                </Space>
            </div>
            </>
            : 
                <>
                <Contract set={() => setContract(false)}/>
                </>
                }
            <Footer
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                    backgroundColor: "#1451b4",
                    color: "#f9ca3c",
                    fontWeight: "bolder",
                    cursor: 'pointer'
                }}>
                <ul>AJUDA</ul>
                <ul>BLOG</ul>
                <ul>SOBRE NÓS</ul>
                <ul>POLÍTICA DE PRIVACIDADE</ul>
            </Footer>
        </div>

    );
}