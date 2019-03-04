(function() {

var ta, update;

update = function() {
    var c, canvas, ch, chars, ctx, cw, f, i, j, spec, col;
    canvas = document.createElement('canvas');
    canvas.width = parseInt($('#outw').val());
    canvas.height = parseInt($('#outh').val());
    col = $('#charcol').val();

    ctx = canvas.getContext('2d');
    ctx.fillStyle = col;

    f = function(n) {
        return $('#font' + n).val();
    };

    ctx.font = (f('style')) + " " + (f('size')) + "px " + (f('name'));
    cw = $('#charw').val();
    ch = $('#charh').val();
    i = j = 0;
    chars = $('#chars').val().split('');

    spec = {
        charWidth: cw / canvas.width,
        charHeight: ch / canvas.height,
        coords: {}
    };

    while (chars.length) {
        c = chars.shift();
        spec.coords[c] = [i * cw / canvas.width, j * ch / canvas.height];
        ctx.fillText(c, i * cw + cw * .2, (j + 1) * ch - ch * .15);                    
        if (cw * (i + 2) > canvas.width) {
            i = 0;
            j++;
        } else {
            i++;
        }
    }

    $('#output').attr('src', canvas.toDataURL());
    return $('#spec').val(JSON.stringify(spec));
};

$('input').add('textarea').on('change', update);

$(document).ready(update);

    ta = $('#spec');
    ta.on('focus', function() {
        ta.select();
        return ta.on('mouseup', function() {
            ta.off('mosueup');
            return false;
        });
    });
}).call(this);