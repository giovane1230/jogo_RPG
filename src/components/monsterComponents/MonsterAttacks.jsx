import React, { useState, useEffect } from 'react';

const MonsterAttacks = ({ htmlContent }) => {
  const [attacks, setAttacks] = useState([]);
  const [filteredAttacks, setFilteredAttacks] = useState([]);
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    actionType: 'all',
    damageType: 'all',
    minDC: 0
  });

  // Função para extrair ataques (similar à que demonstrei anteriormente)
  const extractAttacksFromHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const attackElements = Array.from(doc.querySelectorAll('.border.p-2.rounded.shadow-sm'));
    
    return attackElements.map(element => {
      // Implementação da lógica de extração mostrada anteriormente
      // Retorna objetos no formato MonsterAction
    });
  };

  useEffect(() => {
    if (htmlContent) {
      const extracted = extractAttacksFromHTML(htmlContent);
      setAttacks(extracted);
      setFilteredAttacks(extracted);
    }
  }, [htmlContent]);

  useEffect(() => {
    let results = attacks;
    
    // Aplicar filtros
    if (filters.searchTerm) {
      results = results.filter(attack => 
        attack.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        attack.monsterName.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    if (filters.actionType !== 'all') {
      results = results.filter(attack => attack.actionType === filters.actionType);
    }
    
    if (filters.damageType !== 'all') {
      results = results.filter(attack => 
        attack.damage && attack.damage.type === filters.damageType
      );
    }
    
    if (filters.minDC > 0) {
      results = results.filter(attack => 
        attack.save && attack.save.dc >= filters.minDC
      );
    }
    
    setFilteredAttacks(results);
  }, [filters, attacks]);

  // Tipos de dano únicos para o filtro
  const damageTypes = [...new Set(
    attacks
      .filter(attack => attack.damage)
      .map(attack => attack.damage.type)
  )].sort();

  return (
    <div className="monster-attacks-container">
      <div className="filters-section">
        <h2>Filtros</h2>
        <div className="filter-group">
          <label>
            Buscar:
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
              placeholder="Nome ou monstro..."
            />
          </label>
        </div>
        
        <div className="filter-group">
          <label>
            Tipo de Ação:
            <select
              value={filters.actionType}
              onChange={(e) => setFilters({...filters, actionType: e.target.value})}
            >
              <option value="all">Todos</option>
              <option value="action">Ação</option>
              <option value="special">Especial</option>
              <option value="legendary">Lendária</option>
              <option value="reaction">Reação</option>
            </select>
          </label>
        </div>
        
        <div className="filter-group">
          <label>
            Tipo de Dano:
            <select
              value={filters.damageType}
              onChange={(e) => setFilters({...filters, damageType: e.target.value})}
            >
              <option value="all">Todos</option>
              {damageTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
        
        <div className="filter-group">
          <label>
            DC Mínimo:
            <input
              type="number"
              min="0"
              max="30"
              value={filters.minDC}
              onChange={(e) => setFilters({...filters, minDC: parseInt(e.target.value) || 0})}
            />
          </label>
        </div>
      </div>

      <div className="results-section">
        <div className="attacks-list">
          <h3>Ataques Encontrados: {filteredAttacks.length}</h3>
          <ul>
            {filteredAttacks.map(attack => (
              <li 
                key={attack.id} 
                onClick={() => setSelectedAttack(attack)}
                className={selectedAttack?.id === attack.id ? 'selected' : ''}
              >
                <strong>{attack.name}</strong> - {attack.monsterName}
                <div className="attack-meta">
                  <span className="type-badge">{attack.actionType}</span>
                  {attack.damage && (
                    <span className="damage-badge">{attack.damage.type}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="attack-details">
          {selectedAttack ? (
            <>
              <h2>{selectedAttack.name}</h2>
              <h3>{selectedAttack.monsterName}</h3>
              
              <div className="detail-section">
                <h4>Tipo: <span className="type-badge">{selectedAttack.actionType}</span></h4>
              </div>
              
              {selectedAttack.attackType && (
                <div className="detail-section">
                  <h4>Tipo de Ataque:</h4>
                  <p>{selectedAttack.attackType}</p>
                </div>
              )}
              
              {selectedAttack.range && (
                <div className="detail-section">
                  <h4>Alcance:</h4>
                  <p>{selectedAttack.range}</p>
                </div>
              )}
              
              {selectedAttack.damage && (
                <div className="detail-section">
                  <h4>Dano:</h4>
                  <p>
                    <strong>{selectedAttack.damage.average || selectedAttack.damage.dice}</strong> (
                    {selectedAttack.damage.dice}) {selectedAttack.damage.type}
                  </p>
                </div>
              )}
              
              {selectedAttack.save && (
                <div className="detail-section">
                  <h4>Teste de Resistência:</h4>
                  <p>
                    <strong>DC {selectedAttack.save.dc} {selectedAttack.save.ability}</strong> - 
                    {selectedAttack.save.effect}
                  </p>
                </div>
              )}
              
              <div className="detail-section">
                <h4>Descrição Completa:</h4>
                <p>{selectedAttack.description}</p>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Selecione um ataque para ver os detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Estilos sugeridos (pode ser CSS ou CSS-in-JS)
const styles = `
  .monster-attacks-container {
    display: flex;
    gap: 20px;
    padding: 20px;
  }
  
  .filters-section {
    flex: 1;
    max-width: 300px;
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
  }
  
  .filter-group {
    margin-bottom: 15px;
  }
  
  .filter-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .filter-group input,
  .filter-group select {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .results-section {
    flex: 3;
    display: flex;
    gap: 20px;
  }
  
  .attacks-list {
    flex: 1;
    max-height: 80vh;
    overflow-y: auto;
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
  }
  
  .attacks-list ul {
    list-style: none;
    padding: 0;
  }
  
  .attacks-list li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  }
  
  .attacks-list li:hover {
    background: #e9e9e9;
  }
  
  .attacks-list li.selected {
    background: #d4e6f1;
  }
  
  .attack-meta {
    display: flex;
    gap: 5px;
    margin-top: 5px;
  }
  
  .type-badge {
    background: #4a89dc;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.8em;
  }
  
  .damage-badge {
    background: #e9573f;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.8em;
  }
  
  .attack-details {
    flex: 2;
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
  }
  
  .detail-section {
    margin-bottom: 15px;
  }
  
  .no-selection {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #999;
  }
`;

// Adicionar estilos ao documento
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default MonsterAttacks;