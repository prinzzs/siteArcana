async function initMap() {

        const { Map } =
            await google.maps.importLibrary("maps");

        const { AdvancedMarkerElement } =
            await google.maps.importLibrary("marker");

        const loc = {
            lat: -24.005027857195923,
            lng: -46.41220429945576
        };

        const mapa = new Map(
            document.getElementById("map"),
            {
                center: loc,
                zoom: 14,
                mapId: "MAPA_EDU"
            }
        );

        const marcador = new AdvancedMarkerElement({
            map: mapa,
            position: loc,
            title: "FATEC PG"
        });

    }
    window.initMap = initMap;