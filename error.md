---
layout: pagina
title: Error
---

### No se pudo completar el proceso

<div class="recuadro mensaje">
    <strong id="mensaje"></strong>
</div>

Por favor ponte en [contacto](mailto:mivoz@partidodigital.org.uy) con nosotros pasandonos detalles de lo sucedido e intentaremos ayudarte.

<script>
    var errores = {
    {% for error in site.data.errores %} 
        "{{error.codigo}}": "{{error.mensaje}}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
    }
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var codigo = getParameterByName("codigo");
    document.getElementById("mensaje").innerHTML = (codigo ? codigo.toUpperCase()  + ": " : "") + (errores[codigo] ? errores[codigo] : "No hay más detalles.");
</script>