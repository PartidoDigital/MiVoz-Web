---
layout: pagina
title: ¡Éxito!
---

### Proceso completado

<div class="recuadro mensaje">
    <strong id="mensaje"></strong>
</div>

Por favor ponte en [contacto](mailto:contacto@mivoz.uy) con nosotros si tienes alguna consulta.

<script>
    var exitos = {
    {% for exito in site.data.exitos %} 
        "{{exito.codigo}}": "{{exito.mensaje}}"{% unless forloop.last %},{% endunless %}
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
    document.getElementById("mensaje").innerHTML = exitos[codigo] ? exitos[codigo] : ":)";
</script>