(
	function()
	{
		var $ = function(_id)
		{
			return document.getElementById(_id);
		};
		
		var inpStyle = function()
		{
			var inps = $("inpList").getElementsByTagName("input");//���idΪinpList �е����е�input
			for(var i = 0; i < inps.length; i++)
			{
				inps[i].onfocus = function()
				{
					var par = this.parentNode.parentNode;
					var msg = par.getElementsByTagName("p")[0];
					this.parentNode.parentNode.className = "point cl";//this ָ��ǰ�������������¼���Ԫ��
					check.focus[this.id](par, this, msg);
				}
				
				inps[i].onblur = function()
				{
					var par = this.parentNode.parentNode;
					var msg = par.getElementsByTagName("p")[0];
					par.className = "def cl";//this ָ��ǰ�������������¼���Ԫ��
					check.blurs[this.id](par, this, msg);
				}
			}
			
			$("enter").onclick = function()
			{
				subcheck(inps);
			}
		};
				
		var check =
		{
			focus:
			{
				uname:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>���Լ�������ְɣ�������Ϊ����¼��վ���û���";
				},
				email:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>���������ĳ��������ַ���������ַ����Ϊ�޸�����";
				},
				mobile:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>�����������ֻ����룬��������֮�����ϵ";
				},
				pwd:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>�����밲ȫ���룬������Ϊ���ĵ�¼����";
				},
				qrpwd:function(_dd, _this, _p)
				{
					_dd.className = "point cl";
					_p.innerHTML = "<i></i>�뽫���������������һ��";
				}
			},
			blurs:
			{
				uname:function(_dd, _this, _p)//dd��ǩ ��ǰ����� ��Ϣ����ı�ǩp
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>�û��ʺŲ���Ϊ�գ�";
					}
					else if(_this.value.length < 3 || _this.value.length > 16)
					{
						_p.innerHTML = "<i></i>�û�������Ӧ������3-16λ�ַ�֮�䣡";
					}
					else if(!/^[\w_-\u4e00-\u9fa5]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>�û���ֻ���ɴ�Сд��ĸ�����֣��»��ߣ��к��ߺ�������ɣ�";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				},
				email:function(_dd, _this, _p)
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>���䲻��Ϊ�գ�";
					}
					else if(!/\w+((-w+)|(\.\w+))*\@[\w]+((\.|-)[\w]+)*\.[\w]+/.test(_this.value))
					{
						_p.innerHTML = "<i></i>��������ȷ�������ַ��";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				},
				mobile:function(_dd, _this, _p)
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>�ֻ����벻��Ϊ�գ�";
					}
					else if(!/0?(13|14|15|18)[0-9]{9}/.test(_this.value))
					{
						_p.innerHTML = "<i></i>��������ȷ���ֻ����룡";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				},
				pwd:function(_dd, _this, _p)
				{
					var flag = false;
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>���벻��Ϊ�գ�";
					}
					else if(_this.value.length < 6 || _this.value.length > 16)
					{
						_p.innerHTML = "<i></i>���볤��Ӧ������6-16λ�ַ�֮�䣡";
					}
					else if(!/^[\w_-]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>����ֻ���ɴ�Сд��ĸ�����֣��»��ߺ��к�����ɣ�";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				},
				qrpwd:function(_dd, _this, _p)
				{
					var flag = false;
					var pwd = $("pwd");
					_dd.className = "error cl";
					if(_this.value == "")
					{
						_p.innerHTML = "<i></i>Ϊ�˱�֤�����������׼ȷ�������ٴ��������룡";
					}
					else if(_this.value != pwd.value)
					{
						_p.innerHTML = "<i></i>�����������벻һ�£����������룡";
					}
					else
					{
						_dd.className = "ok cl";
						_p.innerHTML = "<i></i>";
						flag = true;
					}
					return flag;
				}
			}
		};
		
		var subcheck = function(inps)
		{
			var flag = true;
			for(var i = 0; i < inps.length; i++)
			{
				var par = inps[i].parentNode.parentNode;
				var msg = par.getElementsByTagName("p")[0];
				if(!check.blurs[inps[i].id](par, inps[i], msg))
				{
					flag = false;
					break;
				}
			}
			
			if(flag)
			{
				alert("�����ύ");
			}
			else
			{
				alert("�����ύ");
			}
		}
		
		window.onload = function()//�൱�ڳ������� main����
		{
			inpStyle();
		}
	}
)();