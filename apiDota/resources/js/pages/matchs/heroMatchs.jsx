import React, { useEffect, useState } from 'react';

const MatchHistory = ({ hero }) => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/matchs/${hero}/match-hero`)
            .then((response) => response.text()) // Leer la respuesta como texto XML
            .then((data) => {
                console.log("Raw SOAP XML Response:", data); // Verificar el XML recibido

                // Parsear la respuesta SOAP XML completa
                const parser = new DOMParser();
                const soapXml = parser.parseFromString(data, "application/xml");

                // Extraer el contenido del nodo <return>
                const returnNode = soapXml.getElementsByTagName("return")[0];
                if (!returnNode) {
                    console.error("No se encontró el nodo <return> en la respuesta SOAP.");
                    setLoading(false);
                    return;
                }

                // Parsear el contenido XML dentro del nodo <return>
                const innerXml = returnNode.textContent;
                const innerDoc = parser.parseFromString(innerXml, "application/xml");

                // Extraer datos de cada partida en el XML interno
                const matches = Array.from(innerDoc.getElementsByTagName("match")).map((match) => {
                    const matchId = match.getElementsByTagName("matchId")[0]?.textContent || "N/A";
                    const date = match.getElementsByTagName("date")[0]?.textContent || "N/A";
                    const heroe = match.getElementsByTagName("heroe")[0]?.textContent || "N/A";
                    const result = match.getElementsByTagName("result")[0]?.textContent || "N/A";
                    
                    return { matchId, date, heroe, result };
                });

                console.log("Extracted Matches:", matches); // Verificar los datos extraídos
                setMatchHistory(matches);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching match history:', error);
                setLoading(false);
            });
    }, [userId]);

    return (
        <div>
            <h1>Historial de Partidas del Usuario {userId}</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID de Partida</th>
                            <th>Fecha</th>
                            <th>Héroe</th>
                            <th>Resultado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchHistory.length > 0 ? (
                            matchHistory.map((match, index) => (
                                <tr key={index}>
                                    <td>{match.matchId}</td>
                                    <td>{match.date}</td>
                                    <td>{match.heroe}</td>
                                    <td>{match.result}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No se encontraron partidas</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MatchHistory;
