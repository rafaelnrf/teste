//var urlDados = "http://www.api.guiademoteis.com.br/";
//var urlImg = "http://www.guiademoteis.com.br/";
//var urlDados = "http://localhost:2236/";
var urlDados_nova = "http://www.chezmenu.com.br/webservice/";
var urlWebservice = "http://www.chezmenu.com.br/webservice/"
var urlImg_nova = "http://www.penabola.com.br/chezmenu1/imagens/";
var urlImg_externa = "http://www.chezmenu.com.br/upload/categoria/";
var urlImg_cat = "http://www.chezmenu.com.br/upload/categoria/";
var urlImg_dest = "http://www.chezmenu.com.br/upload/dest/";
var urlImg_rest = "http://www.chezmenu.com.br/upload/restaurante/";

//Vai para o topo da home
function GoTop() {
    window.scrollTo(0, 0);
}
//##############################################################

//Carrega o botão baixar app, header, e footer
//function IncludeHeader(callback) {
function IncludeHeader() {
    //$('#header').append($("<div>").load("../Includes/_header.html", callback));
    var newHeader = $('#home .header').clone();
    var newRodape = $('#rodape').clone();

    //Replica header
    $('#detalhes .header').append(newHeader.html());
    $('#buscaPorNome .header').append(newHeader.html());
    $('#login .header').append(newHeader.html());
    $('#esqueci-senha .header').append(newHeader.html());
    $('#senha-altera .header').append(newHeader.html());
    $('#informativo-altera .header').append(newHeader.html());
    $('#descontos .header').append(newHeader.html());
    $('#cupons-digitais .header').append(newHeader.html());
    $('#moteis-favoritos .header').append(newHeader.html());
    $('#cortesia .header').append(newHeader.html());
    $('#cadastro .header').append(newHeader.html());
    $('#sem-geolocation .header').append(newHeader.html());
    //Replica rodapé
    $('#detalhes .rodape').append(newRodape.html());
    $('#buscaPorNome .rodape').append(newRodape.html());
    $('#login .rodape').append(newRodape.html());
    $('#esqueci-senha .rodape').append(newRodape.html());
    $('#senha-altera .rodape').append(newRodape.html());
    $('#informativo-altera .rodape').append(newRodape.html());
    $('#descontos .rodape').append(newRodape.html());
    $('#cupons-digitais .rodape').append(newRodape.html());
    $('#cortesia .rodape').append(newRodape.html());
    $('#moteis-favoritos .rodape').append(newRodape.html());
    $('#cadastro .rodape').append(newRodape.html());
    $('#sem-geolocation .rodape').append(newRodape.html());
} 

//Rotina inicial
function inicio(callback) {
        //window.location = "#sem-geolocation";
        $('#hidLatitude').val("0");
        $('#hidLongitude').val("0");
        $('#hidPagina').val("1");
       // $('#spiner-motel-perto').show();
   
        //Se tudo deu certo, lê os motéis próximos (pela latitude e longitude) 
        $('#hidPagina').val("1")
        var param = {
            latitude:   $('#hidLatitude').val().replace(".", ","),
            longitude:  $('#hidLongitude').val().replace(".", ","),
            pageNumber: $('#hidPagina').val(),
            pageSize:   "6"
        };

		//alert(urlDados_nova + "srv/categoria.asp");
        //Motéis Perto
        $.ajax({
            type: "POST",
            //url: urlDados + "Motel/GetNearMotels",
            url: urlDados_nova + "categoria.php",
            data: param,
            success: SucessoLoadMoteisPerto,
            complete: callback,
            dataType: "json"
        });
    }

    //Pega a latitude e longitude do usuário
function initGeoLocalizacao(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                locSucesso(position, callback);
            }, erro);
        } else {
            $('loader').hide();
            alert("sem conexao!!");
            window.location = "#sem-geolocation";
        }
    }

function locSucesso(position, callback) {

        //Armazena Latitude e longitude
        var geo = {
            Latitude:  position.coords.latitude,
            Longitude: position.coords.longitude
        };
        sessionStorage.setItem('Geo', JSON.stringify(geo));

        $('#hidLatitude').val(position.coords.latitude);
        $('#hidLongitude').val(position.coords.longitude);
        $('#hidPagina').val("1");
       // $('#spiner-motel-perto').show();
   
        //Se tudo deu certo, lê os motéis próximos (pela latitude e longitude) 
        $('#hidPagina').val("1")
        var param = {
            latitude:   $('#hidLatitude').val().replace(".", ","),
            longitude:  $('#hidLongitude').val().replace(".", ","),
            pageNumber: $('#hidPagina').val(),
            pageSize:   "6"
        };

		//alert(urlDados_nova + "srv/categoria.asp");
        //Motéis Perto
        $.ajax({
            type: "POST",
            //url: urlDados + "Motel/GetNearMotels",
            url: urlDados_nova + "categoria.php",
            data: param,
            success: SucessoLoadMoteisPerto,
            complete: callback,
            dataType: "json"
        });

    }

    function erro(error) {
        $('#hidLatitude').val("0");
        $('#hidLongitude').val("0");
        $('#status').text(error == typeof msg == 'string' ? msg : "falha ao localizar");
        $('#status').css('background-color', '#F00').css('padding', '5px');
    }
//##############################################################

    function LoadMaisMoteiePerto() {

        $('.loader').show();
        $('#moteisperto-next').remove();
        var param = {
            latitude:   $('#hidLatitude').val().replace(".", ","),
            longitude:  $('#hidLongitude').val().replace(".", ","),
            pageNumber: $('#hidPagina').val(),
            pageSize:   "6" 
        };

        $.ajax({
            type: "POST",
            url: urlDados + "Motel/GetNearMotels",
            data: param,
            success: SucessoLoadMoteisPerto,
            dataType: "json"
        });

    }

    function SucessoLoadMoteisPerto(dados) {
	//alert("SucessoLoadMoteisPerto");
        //$("#moteis-premium").remove();

        $.each(dados, function (i, item) {
            //var km = item.Distance.toString();
            var texto = "<li id='categoria-" + item.categoriaId + "' class='arrow'>";
            //texto = texto + "<a href='#detalhes' onclick='LoadDetalhesMotel(" + item.MotelId + ")'>";
            texto = texto + "<a href='#rest' data-categoriaid='" + item.categoriaId + "'>";
            texto = texto + "<div class='premium-left'/>";
            var logotipo = item.logo;
			if ( logotipo.indexOf("thumb") == -1)
			{
				texto = texto + "<img src='" + '../imagens/' +  item.logo + "'/>";
			} else {
				texto = texto + "<img src='" + urlImg_cat +  item.logo + "'/>";
			};
            //texto = texto + "<span class='distancia'>Distância: <strong>" + km.substring(0, 4) + " km</strong></span>";
            
            texto = texto + "</div>";
            if (item.planoredef == "1")
                texto = texto + "<span class='motel-premium'>";
            else if (item.planoredef == "2")
                texto = texto + "<span class='motel-indicado'>";
            else
                texto = texto + "<span>";

            texto = texto + "</span>";
            texto = texto + "</div>";
            texto = texto + "<div class='premium-right'/>";
            texto = texto + "<span class='nome'>" + item.categoria + "</span>";
            //texto = texto + "<span class='endereco'>" + item.City + " - " + item.Uf + "</span>";
            texto = texto + "</div>"; 
            texto = texto + "</a></li>"
            texto = texto + "</li>"
            $("#moteis-premium").append(texto);
            $('.loader').hide();
        });
		
        //Paginação
        var TotPaginas = parseInt(dados.PagesCount);
        var Pagina     = parseInt($('#hidPagina').val());
        Pagina = Pagina + 1;
        if (Pagina < TotPaginas) {
            $('#hidPagina').val(Pagina);
            texto = "<li id='moteisperto-next'><a href='#' onclick='LoadMaisMoteiePerto(" + Pagina + ")'>VER MAIS MOTÉIS</a><div class='premium-right'/></div></li>"
            $("#moteis-premium").append(texto);
        }
        else 
            $("#moteisperto-next").hide();
    }

    function SucessoRestCategoria(dados) {
		
		$("#rest-premium").empty();
		$("h2").empty();
        $.each(dados, function (i, item) {
            //var km = item.Distance.toString();
            var km = item.km;
			var categoria = item.categoria
            var texto = "<li id='rest-" + item.id + "' class='arrow'>";
            texto = texto + "<a href='#detalhes' onclick='LoadRestaurante(" + item.id + ");'>";
            //texto = texto + "<a href='#detalhes' data-restid='" + item.id + "'>";
            texto = texto + "<div class='premium-left'>";
            var logotipo = item.logo;
			if (logotipo.indexOf("thumb") == -1)
			{
				texto = texto + "<img src='" + '../imagens/' +  item.logo + "'/>";
			} else {
				texto = texto + "<img src='" + urlImg_rest +  item.logo + "'/>";
			};
            //texto = texto + "<span class='distancia'>Distância: <strong>" + km.substring(0, 4) + " km</strong></span>";
            
            texto = texto + "</div>";
            if (item.planoredef == "1")
                texto = texto + "<span class='motel-premium'>";
            else if (item.planoredef == "2")
                texto = texto + "<span class='motel-indicado'>";
            else
                texto = texto + "<span>";
            texto = texto + "</span>";
            texto = texto + "</div>";
            texto = texto + "<div class='premium-right'/>";
            texto = texto + "<span class='nome'>" + item.cliente + "</span>";
            texto = texto + "<span class='endereco'>" + item.cidade + " - " + item.estado + "</span>";
            texto = texto + "</div>"; 
            texto = texto + "</a></li>"
            texto = texto + "</li>"
            $("#rest-premium").append(texto);
			$("h2").empty();
			if (item.categoria == 1) { $("h2").append("Categoria: A dois") };
			if (item.categoria == 2) { $("h2").append("Categoria: Em família")};
			if (item.categoria == 3) { $("h2").append("Categoria: Com amigos")};
			if (item.categoria == 4) { $("h2").append("Categoria: Business")};
			if (item.categoria == 5) { $("h2").append("Categoria: Chefs")};
			$(".det-imagem").attr("src", urlImg_externa + item.propaganda);
            $('.loader').hide();
        });

		//Paginação
        var TotPaginas = parseInt(dados.PagesCount);
        var Pagina     = parseInt($('#hidPagina').val());
        Pagina = Pagina + 1;
        if (Pagina < TotPaginas) {
            $('#hidPagina').val(Pagina);
            texto = "<li id='moteisperto-next'><a href='#' onclick='LoadMaisMoteiePerto(" + Pagina + ")'>VER MAIS MOTÉIS</a><div class='premium-right'/></div></li>"
            $("#moteis-premium").append(texto);
        }
        else 
            $("#moteisperto-next").hide();
    }

//TV por IP
function LoadTVPorIP(callback) {
    var param = {
        latitude:  $('#hidLatitude').val().replace(".", ","),
        longitude: $('#hidLongitude').val().replace(".", ","),
        pageNumber: "1"
    };

    //$('#spiner-tv').show();
	//alert(urlDados_nova + "srv/destaque.asp");
	//alert(urlImg_nova + "imagem.png");
    $.ajax({
        type: "POST",
        url: urlDados_nova + "destaque_preview.php",
        //url: urlDados + "Motel/GetDestaqueTV/",
        data: param,
        success: SucessoLoadTVPorIP,
        complete: callback,
        dataType: "json"
    });
}

function SucessoLoadTVPorIP(dados) {
    $.each(dados, function (i, item) {
        i++;
        var texto = "<figure id='" + item.Id + "'>";
        texto = texto + "<a href='#detalhes' onclick='LoadDetalhesMotel(" + item.Id + ")' >";
        var img_destaque = item.Imagem;
		if (img_destaque.indexOf("thumb") == -1)
		{
			texto = texto + "<img src='" + '../imagens/' +  item.Imagem + "'/>";
		} else {
			texto = texto + "<img src='" + urlImg_dest +  item.Imagem + "'/>";
		};

        // Titando o nome do restaurante
		//texto = texto + "<figcaption >" + item.Titulo + "</figcaption>";
        //texto = texto + "</a>";
        //texto = texto + "</figure>"
        $("#slider-3-content").append(texto);
    });
}

function HomeTVLoad() {
    $('#tv-home').swipeSlide({ visibleSlides: 1 });
}
//##############################################################

function LoadRestCategoria(categoria_id, callback) {
		//alert(urlDados_nova + "srv/rest_categoria.asp");
		/*
	   var param = {
            latitude:   $('#hidLatitude').val().replace(".", ","),
            longitude:  $('#hidLongitude').val().replace(".", ","),
            pageNumber: $('#hidPagina').val(),
            pageSize:   "6" 
        };
		*/
		
        $.ajax({
            type: "POST",
            url: urlDados_nova + "rest_categoria_preview.php?categoria_id="+categoria_id,
//            data: param,
            success: SucessoRestCategoria,
            complete: function(xhr,status){    },
            dataType: "json"
        });
}




function LoadDetalhesCategoria(categoria_id) {
	
    //Limpa os dados do motel anterior
	window.location = "#detalhes"; // novidade geral.js
    $('#detalhes h1').html("");
    $(".det-logo").attr("src", urlImg + "imagens/logotipos/pixel_transp.png");
    $(".det-logo").attr("alt", "");
    $('.det-topo h2').html("");
    $('.det-endereco').html("");
    $('.det-end-bai-cid').html("");
    $('#btn_det_ligar').attr("href", "tel: ");
    $('#det-suites').empty();
    $('#det-descontos').empty();
	if(rest_id != 'undefined'){
    	$('.loader').show();//DO SOMETHING
	};
    var param = {
        id: motel_id
    };

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetMotelById",
        data: param,
        success: SucessoLoadDetalhesMotel,
        dataType: "json"
    });
}

//LoadDetalhesMotel (load motel, detalhes)
//No evento "LoadDetalhesMotel" as suites são lidas
function LoadDetalhesMotel(motel_id) {

    //Limpa os dados do motel anterior
    $('#detalhes h1').html("");
    $(".det-logo").attr("src", urlImg + "imagens/logotipos/pixel_transp.png");
    $(".det-logo").attr("alt", "");
    $('.det-topo h2').html("");
    $('.det-endereco').html("");
    $('.det-end-bai-cid').html("");
    $('#btn_det_ligar').attr("href", "tel: ");
    $('#det-suites').empty();
    $('#det-descontos').empty();
    $('.loader').show();
    var param = {
        id: motel_id
    };

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetMotelById",
        data: param,
        success: SucessoLoadDetalhesMotel,
        dataType: "json"
    });
}

    function SucessoLoadDetalhesMotel(dados) {
        var motel = dados.Motel;

        $('#hidMoelId').val(dados.Motel.MotelId);
        $('#detalhes h1').html(dados.Motel.MotelName);
        $(".det-logo").attr("src", urlImg + "imagens/" + motel.Logo);
        $(".det-logo").attr("alt", motel.MotelName);
        $('.det-topo h2').html(motel.MotelName);
        $('.det-endereco').html(motel.Address);
        $('.det-end-bai-cid').html(motel.District + " - " + motel.City + " - " + motel.Uf);
        $('#btn_det_ligar').attr("href", "tel: " + motel.Phone.replace("(", "").replace(")", "").replace("-", "").replace(" ", ""));

        //Descontos
        //Se houver, habilita  o botão
        if (motel.Discounts.length >= 1)
            $('#btn_det_descontos').parents().show();
        else
            $('#btn_det_descontos').parent().hide();

        $.each(motel.Discounts, function (i, desconto) {
            var divId = "#desconto-mt-" + motel.MotelId;
            var newDesconto = $('.desconto').clone();
            newDesconto.removeAttr('id');
            newDesconto.removeAttr('style');
            newDesconto.data('entryId', "desconto-mt-" + motel.MotelId);
            newDesconto.find(".titulo").html(desconto.DiscountTitle);
            newDesconto.find(".subtitulo").html(desconto.DiscountSubTitle);
            newDesconto.find(".descricao").html(desconto.Description);

            var botao = "<a class='btn-add-cupomdigital' href='#' onclick='AddCupomDigital(" + desconto.DiscountId + ")' >Adicionar Cupom</a>";
            newDesconto.find(".individual li.digital").html(botao);
            
            /*Configurar para imprimir o cupom*/
            var botaoprint = "<a class='btn-print' href='#' onclick='javascript:window.print(" + desconto.DiscountId + ")' >Imprimir Cupom</a>";
            newDesconto.find(".individual li.print").html(botaoprint);

            $('#det-descontos').append(newDesconto);
        });

        //LoadSuites
        var param = {
            id: motel.MotelId
        };

        $.ajax({
            type: "POST",
            url: urlDados + "Suites/GetMotelSuites",
            data: param,
            success: SucessoLoadSuites,
            dataType: "json"
        });

    }

    function SucessoLoadSuites(dados) {
        var url      = dados.BaseImageUrl;
        var suites   = dados.Suites;

        //$('#det-suites').empty();
        $.each(suites, function (i, suite) {
            var newSuite = $('#suiteTemplate').clone();
            var divTvId  = "#fotos_" + suite.SuiteId;
            newSuite.removeAttr('id');
            newSuite.removeAttr('style');
            newSuite.data('entryId', "suite-" + suite.SuiteId);
            newSuite.find("h2").html(suite.SuiteName);
            newSuite.find(".slider").attr('id', "fotos_" + suite.SuiteId);

            //Lendo as imagens da suite     
            var fotos = suite.Photos;
            var texto = "<div id='slider-" + suite.SuiteId + "-content'>";
            $.each(fotos, function (i, foto) {
                texto = texto + "<figure>";
                texto = texto + "<img src='" + urlImg +  "imagens/suites/" + foto + "'/>";
                texto = texto + "</figure>";
            });
            newSuite.find('.slider').append(texto + "</div>");

            //Periodo
            var periodos = "";
            $.each(suite.Periods, function (i, periodo) {
                periodos = periodos + suite.SuiteId + " - " + periodo.Description + " " + periodo.Price + "<br>";
            });

            if (periodos != "") 
                newSuite.find('.periodo').html("<br><h4>Períodos:</h4>" + periodos);

            //Pernoite
            var pernoite = "";
            $.each(suite.Overnights, function (i, overnight) {
                if (overnight.Price == "R$ 0,00")
                    pernoite = pernoite + overnight.Description + "<br>";
                else
                    pernoite = pernoite + overnight.Description + " " + overnight.Price + "<br>";
            });

            if (pernoite != "")
                newSuite.find('.pernoite').html("<br><h4>Pernoite</h4>" + pernoite);

            //Itens da suíte
            var itens = "";
            var qtde = (suite.Items.length -1);
            $.each(suite.Items, function (i, item) {
                itens = itens + item;
                if (qtde > i)
                    itens = itens + ", ";
            });

            if (itens != "")
                newSuite.find('.itens').html("<br><h4>Essa suíte tem:</h4>" + itens + ".");

            if (suite.Observation != "")
                newSuite.find('.obs').html("<br><h4>Observações:</h4>" + suite.Observation);

            var conteudo = newSuite; 
            $('#det-suites').append(conteudo);

            $(divTvId.toString()).swipeSlide({ visibleSlides: 1 });
            $('.loader').hide();
        });
    }

    //LoadCrtesia
    function LoadCortesia() {

        window.location = "#cortesia";
        $('.loader').show();
        var param = {
            MotelId: $('#hidMoelId').val()
        };

        $.ajax({
            type: "POST",
            url: urlDados + "Motel/GetCortesia",
            //url: "http://localhost:2236/Motel/GetCortesia",
            data: param,
            success: SucessoLoadCortesia,
            dataType: "json"
        });
    }

    function SucessoLoadCortesia(dados) {
        //console.log("cortesia");
        //console.log(dados);
        var texto = "";
        $('#cortesia-dados ul').empty();
        $.each(dados, function (i, item) {
            texto = texto + "<li><span class='cortesia-nome'>" + item.Nome + "</span><span class='cortesia-obs'>" + item.Obs + "</span>";
        });
        $('#cortesia-dados ul').append(texto);
        $('.loader').hide();
    }
//##############################################################

    //Logout
    function Logout() {
        window.location = "#home";
        sessionStorage.removeItem("Usuario");
        sessionStorage.removeItem("Acao");
        sessionStorage.removeItem("Redirect");
        sessionStorage.removeItem("CupomId");
        $('#menu-logout').hide();
        $('#menu-altera-dados').hide();
        $('#menu-cadastro').show();
        $('#menu-cupomdigital').hide();
        $('#menu-senha-altera').hide();
        $('#menu-informativo').hide();
        $('#menu-informativo').hide();
        $('#menu-login').show();
        $('#menu-meus-moteis').hide();
        //Zera campos
        $('.user-nome').text("");
        $('.user-email').text("");
        $('#txtNome').val("");
        $('#txtEmail').val("");
        $('#txtEmail2').val("");
        $('#txtCpf').val("");
        $('#txtSenha').val("");
        $('input[name=cbxPromoAltera]').checked =  false;
        $('input[name=cbxPubliAltera]').checked = false;
        $('input[name=cbxNews]').checked =  false;
        $('input[name=cbxPubli]').checked = false;
        $('input[name="rdlSexo"]').removeAttr("checked");
        //$('input[name=rdlSexo]').checked = false;
        $().toastmessage('showWarningToast', 'Logout concluido!');
    }

//Login
function Login() {

    if ($('#txtEmail').val() == "") {
        $().toastmessage('showErrorToast', 'Digite o e-mail!');
        return false;
    } else if ($('#txtSenha').val() == "") {
        $().toastmessage('showErrorToast', 'Digite a senha!');
        return false;
    }
    
    var param = {
        email: $('#txtEmail').val(),
        password: $('#txtSenha').val()
    };

    $.ajax({
        type: "POST",
        url: urlDados + "UserLogin/Login",
        data: param,
        success: SucessoLogin,
        dataType: "json"
    });
}

function SucessoLogin(dados) {
    if (dados.UserId == 0) {
        $('#txtEmail').val(""); //Da tela de login
        $('#txtSenha').val(""); //Da tela de login
        $().toastmessage('showErrorToast', 'Verifique email e senha!');
    }
    else {
        //Gravando um objeto com dados do usuário em sessão
        $().toastmessage('showSuccessToast', 'Você se logou com sucesso!');
        var usuarioObj = {
            Id: dados.UserId,
            Nome: "",
            Sexo: "",
            DtNasc: "",
            Token: dados.Token,
            Email: $('#txtEmail').val(),
            Senha: $('#txtSenha').val(),
            Cep: "",
            News: "",
            Mailing: "",
            CPF: "",
            StatusCode: dados.StatusCode
        };
                !sessionStorage.Usuario
        sessionStorage.setItem('Usuario', JSON.stringify(usuarioObj));
        $('#txtEmail').val(""); //Da tela de login
        $('#txtSenha').val(""); //Da tela de login
        $('#menu-logout').show();
        $('#menu-login').hide();
        $('#menu-altera-dados').show();
        $('#menu-cadastro').hide();
        $('#menu-cupomdigital').show();
        $('#menu-meus-moteis').show();
        $('#menu-senha-altera').show();
        $('#menu-informativo').show();

        //Pega o restante dos dados do usuário
        LoadDadosUsuario(function () {
            //Se o usuário foi logado, e se houver um Id de cuppm de
            //desconto para adicionar aos cupons digitais, adiciona
            if (sessionStorage.Acao && sessionStorage.CupomId) {
                if (sessionStorage.Acao == "add-cupom-digital")
                    AddCupomDigital(sessionStorage.CupomId);
            }
            else if (sessionStorage.Acao == "AlterarMeusDados")
                AlterarMeusDados();
            else if (sessionStorage.Acao == "informativo-altera")
                LoadInformativo();
            else if (sessionStorage.Acao == "moteis-favoritos")
                LoadMeusMoteis();
            else {
                sessionStorage.removeItem("Acao");
                //sessionStorage.removeItem("Usuario");
                Redireciona();
            }
        });
    }
}
//## Login - fim ##################################################

//Load dados do usuário
function LoadDadosUsuario(callback) {
    var usuarioObj = JSON.parse(sessionStorage.Usuario);

    param = {
        userId: usuarioObj.Id,
        token: usuarioObj.Token
    };

    $.ajax({
        type: "POST",
        url: urlDados + "UserAccount/GetAccountInfo",
        data: param,
        success: SucessoLoadDadosUsuario,
        complete: callback,
        dataType: "json"
    });
}

function SucessoLoadDadosUsuario(dados) {
    var usuarioObj = JSON.parse(sessionStorage.Usuario);
    var dt1 = new Date(dados.User.BirthDateString);
    var dt2 = dt1.getFullYear() + "/" + (dt1.getMonth() + 1) + "/" + (dt1.getDate() + 1);
    usuarioObj.Nome    = dados.User.FullName;
    usuarioObj.Sexo    = dados.User.Gender;
    usuarioObj.DtNasc  = dt2;
    usuarioObj.Cep     = dados.User.ZipCode;
    usuarioObj.News    = dados.User.NewsLetterAgreement;
    usuarioObj.Mailing = dados.User.UserMailling;
    usuarioObj.CPF     = dados.User.SocialSecurityNumber;
    sessionStorage.setItem('Usuario', JSON.stringify(usuarioObj));
    //Popula os campos
    $('.user-nome').text(usuarioObj.Nome);
    $('.user-email').text(usuarioObj.Email);
}


//Troca Senha
function TrocaSenha() {

    var usuarioObj = JSON.parse(sessionStorage.Usuario);
    if ($('#txtSenhaAtual').val() == "") {
        $().toastmessage('showErrorToast', 'Digite a Senha atual!');
        return false;
    } else if ($('#txtSenhaAtual').val() != usuarioObj.Senha) {
        $().toastmessage('showErrorToast', 'A senha atual não confere com a senha digitada');
        return false;
    } else if ($('#txtNovaSenha1').val() == "") {
        $().toastmessage('showErrorToast', 'Digite a nova senha!');
        return false;
    } else if ($('#txtNovaSenha2').val() == "") {
        $().toastmessage('showErrorToast', 'Digite a conformação da nova senha!');
        return false;
    } else if ($('#txtNovaSenha1').val() != $('#txtNovaSenha2').val()) {
        $().toastmessage('showErrorToast', 'A nova senha, e a conformação da nova senha não considem!');
        return false;
    } else {
        var param = {
            userId: usuarioObj.Id,
            Token: usuarioObj.Token,
            ActualPassword: usuarioObj.Senha,
            NewPassword: $('#txtNovaSenha1').val()
        };

        $.ajax({
            type: "POST",
            url: urlDados + "UserAccount/ChangePassword2",
            data: param,
            success: SucessoTrocaSenha,
            dataType: "json"
        });
    }
}

function SucessoTrocaSenha(dados) {
    if (dados.StatusCode != 1) {
        var usuarioObj = JSON.parse(sessionStorage.Usuario);
        usuarioObj.Senha = $('#txtNovaSenha1').val();
        sessionStorage.setItem('Usuario', JSON.stringify(usuarioObj));
        //Limpa os campos:
        $('#txtSenhaAtual').val("");
        $('#txtNovaSenha1').val("");
        $('#txtNovaSenha2').val("");

        window.location = "#home";
        $().toastmessage('showSuccessToast', 'Senha alterada com sucesso!');
    }
    else
        $().toastmessage('showErrorToast', 'Não foi possível adicionar o cupom. Tente novamente mais tarde. Erro: ' + dados.StatusCode);
}
//## Troca Senha - fim ##################################################

//Alterar Meus Dados
function AlterarMeusDados() {

    if (!sessionStorage.Usuario) {
        sessionStorage.Acao = "AlterarMeusDados";
        window.location = "#login";
    }
    else {
        var usuarioObj = JSON.parse(sessionStorage.Usuario);
        $('#cadastro h1').text("Alterar meus dados");
        $('#cadastro').find('form').find('h2').text("");
        $('#cadastro').removeClass('cadastro');
        $('#cadastro').addClass('alterardados');
        $('form').addClass('alterardados');
        $('.cbxNews').hide();
        $('.cbxPubli').hide();
        $('#txtNome').val(usuarioObj.Nome);
        $('#txtNome').attr("disabled", true)
        $('#txtEmail1').val(usuarioObj.Email);
        $('#txtCep').val(usuarioObj.Cep);
        $('#txtSenha').val(usuarioObj.Senha);
        $("#li_senha").hide(); //TODO:Ver se a para sumir sem usar  id de li. $('#txtSenha').parent().hide(); não funciona

        //Manipula dt nascimento
        //http://stackoverflow.com/questions/12346381/set-date-in-input-type-date
        var data = new Date(usuarioObj.DtNasc);
        var mes = data.getMonth() + 1;
        var dtString = data.getFullYear() + "-" + ("0" + mes).slice(-2) + "-" + ("0" + data.getDate()).slice(-2);
        $('#txtData').val(dtString);

        //Manipula radiobutton Sexoo
        var radioId = "sexo_" + usuarioObj.Sexo;
        document.getElementById(radioId).checked = true;
        $('#txtCpf').val(usuarioObj.CPF);
        $('#txtCpf').attr("disabled", (usuarioObj.CPF != "") ? false : true);

        if (usuarioObj.News)
            $('input[name=cbxNews]').attr('checked', true);
        if (usuarioObj.Mailing)
            $('input[name=cbxPubli]').attr('checked', true);

        $('#cadastro form h2').html("Alterar meus dados");
        $('input[name=btnGrava]').attr('value', 'Confirmar alteração');
        window.location = "#cadastro";
    }
}

//Adiciona cupom digital
function AddCupomDigital(cupomId) {

    if (!sessionStorage.Usuario) {
        sessionStorage.Acao     = "add-cupom-digital";
        sessionStorage.Redirect = "#";
        sessionStorage.CupomId  = cupomId;
        //console.log("cupom digital recem armazenado: " + sessionStorage.CupomId);
        window.location = "#login";
    }
    else {
        //Adiciona o cupom digital
        sessionStorage.CupomId = cupomId;
        var usuarioObj = JSON.parse(sessionStorage.Usuario);

        var param = {
            userId: usuarioObj.Id.toString(),
            DiscountId: sessionStorage.CupomId.toString(),
            Token: usuarioObj.Token.toString()
        };
        
        $.ajax({
            type: "POST",
            url: urlDados + "UserDiscount/AddUserDiscount2",
            data: param,
            success: SucessoAddCupomDigital,
            dataType: "json"
        });
    }
}

function SucessoAddCupomDigital(dados) {
    if (dados.StatusCode != 1)
        $().toastmessage('showSuccessToast', 'Cupom adicionado com sucesso!');
    else
        $().toastmessage('showErrorToast', 'Não foi possível adicionar o cupom. Tente novamente mais tarde. Erro: ' + dados.StatusCode);

    sessionStorage.removeItem("Acao");
    sessionStorage.removeItem("Redirect");
    sessionStorage.removeItem("CupomId");
    window.location = "#"; //Aqui eu estou tentando fazer um back (voltar para a pg anterior) dinamicamente
}
//## Add cupom digital - fim ############################################

//Redireciona
function Redireciona() {
    if (!sessionStorage.Redirect)
        window.location = "#home";
    else 
        window.location = sessionStorage.Redirect;

    sessionStorage.removeItem("Acao");
    sessionStorage.removeItem("Redirect");
}
//## Redireciona - fim ##################################################

//Reenvio de senha
function ReenvioDeSenha() {
    var param = {
        EmailouCpf:  $('#txtEmailOuCpf').val()
    }

    $.ajax({
        type: "POST",
        url: urlDados + "UserLogin/EsqueciSenha",
        data: param,
        success: SucessoReenvioDeSenha,
        dataType: "json"
    });
}

function SucessoReenvioDeSenha(dados) {
    window.location = "#";
    $().toastmessage('showSuccessToast', 'Senha reenviada com sucesso!');
}
//## Reenvio de senha - fim ###########################################

//Alterar recebimento de informativos
function LoadInformativo() {
    if (!sessionStorage.Usuario) {
        sessionStorage.Acao = "informativo-altera";
        sessionStorage.Redirect = "#informativo-altera";
        window.location = "#login";
    }
    else {
        window.location = "#informativo-altera";
        var usuarioObj = JSON.parse(sessionStorage.Usuario);
        if(usuarioObj.News)
            $('input[name=cbxPromoAltera]').attr('checked', true);
        if (usuarioObj.Mailing)
             $('input[name=cbxPubliAltera]').attr('checked', true);
    }
}

function AlteraRecebimentoInformativo() {
    var usuarioObj = JSON.parse(sessionStorage.Usuario);
    usuarioObj.News    = $("input[name='cbxPubliAltera']").is(':checked') ? true : false;
    usuarioObj.Mailing = $("input[name='cbxPubliAltera']").is(':checked') ? true : false;
    sessionStorage.setItem('Usuario', JSON.stringify(usuarioObj));
    GravaDadosUsuario();
}
 
function ValidaDadosUsuario() {

    //TODO: Validar Sexo
    //alert("cpf: " + $('#txtCpf').val());
    if ($('#txtNome').val() == "") {
        alert("Você precisa preencher o campo NOME");
        $('#txtNome').focus();
        return false;
    } else if (isValidDate($('#txtData').val())) {
        alert("DATA DE NASCIMENTO inválida!");
        $('#txtData').focus();
        return false;
    } else if (isNaN($('#txtCep').val())) {
        alert("O CEP deve ser preenchido apenas com números");
        $('#txtCep').focus();
        return false;
    } else if ($('#txtEmail1').val() == "") {
        alert("Você precisa preencher o campo E-MAIL");
        $('#txtEmail1').focus();
        return false;
    } else if ($('#txtEmail2').val() == "") {
        alert("Você precisa preencher o campo Confirmação de e-mail");
        $('#txtEmail2').focus();
        return false;
    } else if ($('#txtEmail1').val() != $('#txtEmail2').val()) {
        alert("Os campos E-MAIL e confirmação do E-MAIL devem ser iguais");
        $('#txtEmail2').focus();
        return false;
    } else if (isNaN($('#txtCpf').val())) {
        alert("O CPF deve ser preenchido apenas com números");
        $('#txtCpf').focus();
        return false;
    } else if (!ValidaCpf($('#txtCpf').val())) {
        alert("O CPF inválido!");
        $('#txtCpf').focus();
        return false;
    } else if ($('#txtSenhaCad').val() == "") {
        alert("Você precisa preencher o campo SENHA");
        $('#txtSenha').focus();
        return false;
    } else { //Alteração
        if (sessionStorage.Usuario) {
            var oldData = JSON.parse(sessionStorage.Usuario);
            usuarioObj.Nome    = usuarioObj.Nome;
            usuarioObj.Sexo    = "M"; //TODO: Arrumar
            usuarioObj.DtNasc  = $('#txtData').val();
            usuarioObj.Email   = $('#txtEmail1').val();
            usuarioObj.Cep     = $('#txtCep').val().replace('-','');
            usuarioObj.News    = $("input[name='cbxPubliAltera']").is(':checked') ? true : false;
            usuarioObj.Mailing = $("input[name='cbxPubliAltera']").is(':checked') ? true : false;
            usuarioObj.CPF     = $('#txtCpf').val().replace('.', '').replace('-', '');
        } else { //Inclusão
            var usuarioObj = {
                Id:      0,
                Nome:    $('#txtNome').val(),
                Sexo:    "M", //TODO: Arrumar
                DtNasc:  $('#txtData').val(),
                Token:   "",
                Email:   $('#txtEmail1').val(),
                Senha:   $('#txtSenhaCad').val(),
                Cep:     $('#txtCep').val().replace('-',''),
                News:    $("input[name='cbxPubliAltera']").is(':checked') ? true : false,
                Mailing: $("input[name='cbxPubliAltera']").is(':checked') ? true : false,
                CPF:     $('#txtCpf').val().replace('.', '').replace('-', ''),
                StatusCode: 0
            };
        }
        sessionStorage.setItem('Usuario', JSON.stringify(usuarioObj));
        GravaDadosUsuario();
    }
}

function GravaDadosUsuario() {
    var usuarioObj = JSON.parse(sessionStorage.Usuario);
    var param = {
        userId:   usuarioObj.Id,
        Nome:     usuarioObj.Nome,
        DtNasc:   usuarioObj.DtNasc,
        Sexo:     usuarioObj.Sexo,
        Email:    usuarioObj.Email,
        Password: usuarioObj.Senha,
        Cep:      usuarioObj.Cep,
        Cpf:      usuarioObj.CPF,
        News:     usuarioObj.News,
        Mailing:  usuarioObj.Mailing,
        Token:    usuarioObj.Token
    }

    $.ajax({
        type: "POST",
        //url: urlDados + "UserAccount/UpdateAccountInfo2",
        url: "http://localhost:2236/UserAccount/UpdateAccountInfo2",
        data: param,
        success: SucessoGravaDadosUsuario,
        dataType: "json"
    });
}

function SucessoGravaDadosUsuario(dados) {
    if (dados.StatusCode != 1) 
        $().toastmessage('showSuccessToast', 'Dados alterados com sucesso!');
    else
        $().toastmessage('showErrorToast', 'Não foi possível alterar os dados. Tente novamente mais tarde. Erro: ' + dados.StatusCode);

}
//## Recebimento - fim ###########################################

//Cupons digitais
function LoadCuponsDigitais() {

    if (!sessionStorage.Usuario) {
        sessionStorage.Acao = "lista-cupom-digital";
        sessionStorage.Redirect = "#cupons-digitais";
        window.location = "#login";
    }
    else {
        window.location = "#cupons-digitais";
        var usuarioObj = JSON.parse(sessionStorage.Usuario);

        var param = {
            userId: usuarioObj.Id,
            token: usuarioObj.Token
        }

        $.ajax({
            type: "POST",
            url: urlDados + "UserDiscount/GetUserDiscounts",
            data: param,
            success: SucessoLoadCuponsDigitais,
            dataType: "json"
        });
    } //else
}


function SucessoLoadCuponsDigitais(dados) {
    var cupons = dados.UserDiscounts;
    var motelCupomId = "";
    var motelId = "";

    //console.log("cupons digitais:");
    //console.log(dados);

    $('#meus-cupons').empty();
    $.each(cupons, function (i, cupom) {
        //Quebra
        if (motelId != cupom.MotelId) {
            motelId = cupom.MotelId;
            motelCupomId = "#motel_cupom_" + cupom.MotelId;
            var newMotel = $('.accord').clone();
            var motel_cupomId = "#motel_cupom_" + cupom.MotelId;
            newMotel.attr("id", "motel_cupom_" + cupom.MotelId);
            //newMotel.find("a").html(cupom.MotelId + " - " + cupom.MotelName);
            newMotel.find("a").html(cupom.MotelName);
            $('#meus-cupons').append(newMotel);
            $(motel_cupomId).removeClass('accord');
            $(motel_cupomId).removeAttr('style');
        }

        var newCupom = $('.cupom-dados').clone();
        var validade = cupom.ExpireDate; //+ " - " + cupom.ExpireDate.substring(8, 2) + "/" + cupom.ExpireDate.substring(5, 2) + "/" + cupom.ExpireDate.substring(0, 4);
        newCupom.find(".cupom-titulo").html(cupom.DiscountId + " - " + cupom.DiscountTitle);
        newCupom.find(".cupom-vaidade").html(validade);
        newCupom.find(".cupom-descricao").html(cupom.Description);
        newCupom.find(".cupom-remover").html("<a href='#' onclick='ExcluiCupom(" + cupom.DiscountId + ");'>Exclui</a>");
        $(motelCupomId).append(newCupom.html());
    });

//    $(".cupom-dados-2").hide(); //Mostra todos os accordions fechados
//    $(".cupom a").click(function () {
//        $($(this).parent().parent()).find(".cupom-dados-2").toggle();
//    });
}

//Exclui cupom digital
function ExcluiCupom(cupomId) {
    var usuarioObj = JSON.parse(sessionStorage.Usuario);

    var param = {
        userId: usuarioObj.Id,
        discountId: cupomId, 
        token: usuarioObj.Token
    }

    $.ajax({
        type: "POST",
        url: urlDados + "UserDiscount/DeleteUserDiscount",
        data: param,
        success: SucessoExcluiCupom,
        dataType: "json"
    });

}

function SucessoExcluiCupom(dados) {

    if (dados.StatusCode != 1) {
        LoadCuponsDigitais();
        $().toastmessage('showSuccessToast', 'Cupom excluido com sucesso!');
    }
    else
        $().toastmessage('showErrorToast', 'Não foi possível excluir o cupom. Tente novamente mais tarde. Erro: ' + dados.StatusCode);
}
//## Cupons digitais - fim ###########################################

//Motéis favoritos / MeusMoteis
function LoadMeusMoteis() {
    if (!sessionStorage.Usuario) {
        sessionStorage.Acao = "moteis-favoritos";
        sessionStorage.Redirect = "#moteis-favoritos";
        window.location = "#login";
    }
    else {
        window.location = "#moteis-favoritos";
        var usuarioObj = JSON.parse(sessionStorage.Usuario);

        var param = {
            userId: usuarioObj.Id,
            token: usuarioObj.Token
        }

        $.ajax({
            type: "POST",
            url: urlDados + "FavoriteMotel/GetFavoriteMotels",
            data: param,
            success: SucessoLoadMeusMoteis,
            dataType: "json"
        });
    }
}

function SucessoLoadMeusMoteis(dados) {
    var favoritos = dados.FavoriteMotels;
    var categNomeArray = ["Favoritos", "Sonho de Consumo", "Para uma Data Especial", "Perto de Casa", "Perto do Trabalho", "Perto da Casa Dele(a)", "Para o Dia-a-Dia", "Lista Negra"];
    var CategoriaId = "";

    $('#meus-moteis').empty();
    $.each(favoritos, function (i, favorito) {
        //Quebra
        if (CategoriaId != favorito.CategoryId) {
            CategoriaId = favorito.CategoryId;
            meuMotelId = "#meu_motel_" + favorito.MotelId;
            var newFavorito = $('.accord').clone();
            newFavorito.attr("id", "meu_motel_" + favorito.MotelId);
            var index = parseInt(favorito.CategoryId);
            index--;
            newFavorito.find("a").html(categNomeArray[index]);
            $('#meus-moteis').append(newFavorito);
            $(meuMotelId).removeClass('accord');
            $(meuMotelId).removeAttr('style');
        }

        var newFavorito = $('.meus-mts-dados').clone();
        //newFavorito.find(".meus-mts-titulo").html("<ul class='rounded'><li class='arrow'><a href='#' onclick='LoadDetalhesMotel(" + favorito.MotelId + ");'>" + favorito.MotelName + "</a></li></ul>");
        newFavorito.find(".meus-mts-titulo").html("<a href='#detalhes' onclick='LoadDetalhesMotel(" + favorito.MotelId + ");' class=''>" + favorito.MotelName + "</a>");

        //var rating = parseInt(favorito.Rating);
        newFavorito.find(".meus-mts-star-rating").html(favorito.Rating + " estrelas");
        newFavorito.find(".meus-mts-remover").html("<a href='#' onclick='ExcluiMeusMoteis(" + favorito.FavoriteMotelId + ");'>Exclui</a>");
        $(meuMotelId).append(newFavorito.html());
    });

//    $(".favoritos-dados").toggle(); //Mostra todos os accordions fechados
//    $(".cupom a").click(function () {
//        $($(this).parent().parent()).find(".favoritos-dados").toggle();
//    });
}

//Exclui Motel Favorito
function ExcluiMeusMoteis(motelId) {
    var usuarioObj = JSON.parse(sessionStorage.Usuario);

    var param = {
        userId: usuarioObj.Id,
        favoriteMotelId: motelId,
        token: usuarioObj.Token
    }

    $.ajax({
        type: "POST",
        url: urlDados + "FavoriteMotel/DeleteFavoriteMotel",
        data: param,
        success: SucessoExcluiMeusMoteis,
        dataType: "json"
    });
}

function SucessoExcluiMeusMoteis(dados) {

    if (dados.StatusCode != 1) {
        LoadMeusMoteis();
        $().toastmessage('showSuccessToast', 'Motel removido com sucesso!');
    }
    else
        $().toastmessage('showErrorToast', 'Não foi possível removido. Tente novamente mais tarde. Erro: ' + dados.StatusCode);
}
//## Cupons digitais - fim ###########################################

function BuscaPorNome(element) {
    $('.loader').show();
    var key = $(element).parent().find('.search').val();
    var geo = JSON.parse(sessionStorage.Geo);

    var param = {
        key: key,
        latitude: geo.Latitude,
        longitude: geo.Latitude
    }

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetBuscaGenerica",
        //url: "http://localhost:2236/Motel/GetBuscaGenerica",
        data: param,
        success: SucessoBuscaPorNome,
        dataType: "json"
    });
}

function SucessoBuscaPorNome(dados) {

    window.location = "#buscaPorNome";
    var tipoArray = ["Motel", "Bairro", "Cidade"];
        var tipoAnt = "";
    $('#pre-result').empty();
    $.each(dados, function (i, result) {
        //Quebra
        if (tipoAnt != result.Tipo) {
            tipoAnt = result.Tipo;
            var newTipo = $('.pre-result-sep').clone();
            newTipo.removeAttr('style');
            newTipo.removeAttr('class');
            newTipo.attr('class', 'sep');
            newTipo.attr("id", tipoArray[parseInt(result.Tipo)]);
            newTipo.html(tipoArray[parseInt(result.Tipo)])
            $('#pre-result').append(newTipo);
        }

        var newItem = $('#pre-result-item').clone();
        newItem.removeAttr('id');
        newItem.removeAttr('style');
        newItem.data('id', result.Id);
        newItem.find("a").html(result.Nome + " - " + result.Complemento.trim());
        if (result.Tipo == "0") {
            var texto = "<li id='motel-" + result.Id + "'" + ">";
            texto = texto + "<a href='#detalhes' onclick='LoadDetalhesMotel(" + result.Id + ")' >";
            texto = texto + "<div class='premium-left'/>";
            texto = texto + "<img src='" + urlImg + result.Logo + "'/>";
            texto = texto + "</div>";
            texto = texto + "<div class='premium-right'/>";
            texto = texto + "<span class='nome'>" + result.Id + ' - ' +result.Nome + "</span>";
            texto = texto + "<span class='endereco'>" + result.Complemento + "</span>";
            texto = texto + "</div>";
            texto = texto + "</a></li>"
        }
        else {
            var valor = "LoadMoteisPorRegiao(" + result.Tipo + "," + result.Id + ")"
            newItem.find("a").attr('href', '#buscaPorNome');
            newItem.find("a").attr('onclick', valor);
        }

        if (result.Tipo == "0") 
            $('#pre-result').append(texto);
        else
            $('#pre-result').append(newItem);

    });
    $('.loader').hide();
}

function LoadMoteisPorRegiao(tipo, id) {
    var geo = JSON.parse(sessionStorage.Geo);

    var param = {
        tipo: tipo,
        id:   id,
        latitude: geo.Latitude,
        longitude: geo.Latitude,
        pagina: 0 
    }

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetPorRegiao",
        data: param,
        success: SucessoLoadMoteisPorRegiao,
        dataType: "json"
    });
}

function SucessoLoadMoteisPorRegiao(dados) {

    $("#pre-result").empty();
//    $.each(dados.Motels, function (i, item) {
    $.each(dados, function (i, item) {
        //var km = item.Distance.toString();

        var texto = "<li id='motel-" + item.categoriaId + "'" + ">";
        texto = texto + "<a href='#detalhes' onclick='LoadDetalhesMotel(" + item.categoriaId + ")' >";
        texto = texto + "<div class='premium-left'/>";
        texto = texto + "<img src='" + item.logo + "'/>";
        texto = texto + "</div>";
        texto = texto + "<div class='premium-right'/>";
        texto = texto + "<span class='nome'>" + item.categoria + "</span>";
        //texto = texto + "<span class='endereco'>" + item.City + " - " + item.Uf + "</span>";
        texto = texto + "</div>";
        texto = texto + "</a></li>"
        $("#pre-result").append(texto);
    });

}

//Valida CPF
function ValidaCpf(cpf) {
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
        cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
        cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
        cpf == "88888888888" || cpf == "99999999999")
        return false;

    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    else
        return true;
}
//Valida CPF - Fim ////////////////////////////////////////////////

//Valida Data
function isValidDate(date) {
    var valid = true;

    //var str = "Visit Microsoft!";
    //var n     = str.replace("Microsoft", "W3Schools");
    var date = date.replace("/-/g", "");

    var month = parseInt(date.substring(0, 2), 10);
    var day = parseInt(date.substring(2, 4), 10);
    var year = parseInt(date.substring(4, 8), 10);

    if ((month < 1) || (month > 12)) valid = false;
    else if ((day < 1) || (day > 31)) valid = false;
    else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) valid = false;
    else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) valid = false;
    else if ((month == 2) && ((year % 100) == 0) && (day > 29)) valid = false;

    return valid;
}
//Valida Data - Fim /////////////////////////////////////////////////////

function LoadRestaurante(rest_id) {
	//alert("LoadRestaurante");
    //Limpa os dados do motel anterior
    //$('#detalhes h1').html("");
    //$(".det-logo").attr("src", urlImg + "imagens/logotipos/pixel_transp.png");
    //$(".det-logo").attr("alt", "");
    //$('.det-topo h2').html("");
    //$('.det-endereco').html("");
    //$('.det-end-bai-cid').html("");
    //$('#btn_det_ligar').attr("href", "");
	
    $('#det-suites').empty();
    $('#det-descontos').empty();
    //$('.loader').show();
    var param = {
        id: rest_id
    };
	//console.log(urlDados_nova + "rest_detalhe.php?id="+rest_id);
    $.ajax({
        'async'   : false,
		type: "POST",
        url: urlDados_nova + "rest_detalhe.php?id="+rest_id,
        //data: param,
        success: SucessoLoadRestaurante,
        dataType: "json"
    });
}

function SucessoLoadRestaurante(dados) {
	
        //var rest = dados;

    $.each(dados, function (i, item) {
        //$('#hidMoelId').val(item.id);
		//alert(item.cliente)
	
        $('#detalhes h1').html(item.cliente);
	
        var logotipo = item.logo;
		if ( logotipo.indexOf("thumb") == -1)
		{
			$(".det-logo").attr("src", '../imagens/' + item.logo);
		} else {
			$(".det-logo").attr("src", urlImg_rest + item.logo);
		};
       
        $(".det-logo").attr("alt", item.cliente);
        var logotipo = item.logo;
		if ( logotipo.indexOf("thumb") == -1)
		{
			$(".det-imagem-rest").attr("src", '../imagens/' + item.imagem);
		} else {
			$(".det-imagem-rest").attr("src", urlImg_rest + item.imagem);
		};
        //$(".det-imagem-rest").attr("src", urlImg_nova + item.imagem);
        $(".det-imagem-rest").attr("alt", item.cliente);
        $('.det-topo h2').html(item.cliente);
        $('.det-descricao').html(item.descricao);
        $('.det-espaco').html("&nbsp;");
		$('.det-endereco').html(item.endereco);
        $('.det-end-bai-cid').html(item.cidade + " - " + item.bairro + " - " + item.estado);
        $('.det-telefone').html("Telefone: " + item.telefone);
		//.replace("(", "").replace(")", "").replace("-", "").replace(" ", ""));
        //$('#det_mapa').attr("href", "https://www.google.com.br/maps/place/" + item.endereco + "," + item.Bairro + "," + item.cidade + "," + item.estado + "," + item.cep);		
        $('.det-horario').html("Horário: " + item.horario);
        $('.det-culinaria').html("Culinária: " + item.culinaria);
        $('.det-lugares').html("Lugares: " + item.lugares);
        $('.det-rolha').html("Rolha: " + item.rolha);
        $('.det-cartoes').html("Cartões: " + item.cartoes);
        $('.det-informacoes').html("Informações: " + item.informacoes);
        $('#det-mapa').attr("href", "https://www.google.com.br/maps/place/" + item.endereco + "," + item.bairro + "," + item.cidade + "," + item.estado + "," + item.cep);
        $('#btn_det_ligar').attr("href", "tel: " + item.telefone);
        $('#btn_det_leia').attr("href", "http://" + item.site_chezcroque);
        $('#btn_det_site').attr("href", "http://" + item.site);
        //$('.loader').hide();
		
		//document.getElementById("id_det-descricao").innerHTML = "qual razão";
		//$('#id_det-descricao').html("qual razão");
		
	});
		
        //Descontos
        //Se houver, habilita  o botão
        //if (Discounts.length >= 1)
        //    $('#btn_det_descontos').parents().show();
        //else
        //    $('#btn_det_descontos').parent().hide();

		/* Verificar se tem desconto ou outros flags*/
	    //$('.loader').hide();
    };
