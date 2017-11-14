<#macro seach_head>
 <div class="search_block clearfix">
				<div class="form-group  clearfix">
					<div class="pull-left">
						<#nested>
					</div>
					<div class=" inline_block has-feedback pull-right clearfix">
						<label class="control-label sr-only" for="inputSuccess2">Input
							with success</label> <input type="text" class="form-control"
							id="inputSuccess2"> <span class="glyphicon glyphicon-search form-control-feedback"></span>
					</div>
				</div>
				<div class="form-group hidden clearfix">
					<div class="pull-left">
						<select class="dropdown">
							<option value="1">所属应用</option>
							<option value="2">所属应用 2</option>
							<option value="3">所属应用 3</option>
							<option value="4">所属应用 4</option>
						</select>
						<select class="dropdown">
							<option value="0" selected>接入方式</option>
							<option value="1">接入方式</option>
							<option value="2">SDK</option>
							<option value="3">API</option>
						</select>
						<select class="dropdown">
							<option value="0" selected>状态</option>
							<option value="1">审核完毕</option>
							<option value="2">未审核</option>
						</select>
						<select class="dropdown">
							<option value="0" selected>广告位类型</option>
							<option value="1">审核完毕</option>
							<option value="2">未审核</option>
						</select>
					</div>
					<div class="pull-right">
						<a href="javascript:void(0)" class="btn btn-sm">提交</a> <a
							href="javascript:void(0)" class="btn btn-sm">取消</a>
					</div>
				</div>
			</div>
</#macro>