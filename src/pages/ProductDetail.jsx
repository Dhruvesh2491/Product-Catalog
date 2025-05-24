import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/productService';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getProductById(id)
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch product details.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;

    return (
        <Container className="py-4">
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">Back to Products</Button>
            <Row className="g-4">
                <Col md={5}>
                    <Image src={product.image} fluid className="border p-3 h-100" />
                </Col>
                <Col md={7}>
                    <h3>{product.title}</h3>
                    <h5 className="text-success">${product.price}</h5>
                    <p className="text-muted text-capitalize">{product.category}</p>
                    <p>{product.description}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
