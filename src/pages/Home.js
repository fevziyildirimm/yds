import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

const NewPage = () => {
  return (
    <div className="bg-dark text-white py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h2>Hoşgeldiniz</h2>
            <div className="d-grid gap-3 mt-4">
              <Link to="/card" className="btn btn-primary">
                Kelime kartları
              </Link>
              <Link to="/shuffle" className="btn btn-secondary">
                Eş anlamlısını bul
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
