
<#macro listTab head=[] datas=[] optHead={} page={}>
<div class="row">
				<div class="col-md-12">
					<table class="table">
						<thead>
							<tr>
								<#if checkbox??>
									<th><input type="checkbox" value="" name="checkboxall"></th>
								</#if>
								<#if (head??) && head?size gt 0 &&head?is_sequence>
										<#list head as hd>
											<th style="
											<#if hd['size']?? && hd['size']!="">width:${hd['size']};</#if>
											<#if hd['hide']??>display:none;</#if>
											">${hd['label']!'未知标题'}</th>
										</#list>
								</#if>
								<#if optHead?? && optHead?is_hash && optHead['label']??>
									<th style="
									<#if optHead['size']?? && optHead['size']!="">width:${optHead['size']};</#if>
									">
									${optHead['label']!'操作'}
									</th>
								</#if>
							</tr>
						</thead>
						<tbody>
							<#if (datas??) && datas?size gt 0 &&datas?is_sequence>
										<#list datas as val>
											<tr>
											<#if (head??) && head?size gt 0 && head?is_sequence>
														<#list head as hd>
															<td style="
																<#if hd['hide']??>display:none;</#if>
															">${val[hd['key']!'未知标题']!''}</td>
														</#list>
														<#-- 返回值 -->
														<#if optHead?? && optHead?is_hash && optHead['label']??>
															<#assign callbackParams>
																{
																<#list head as hd>
																	<#if hd['callback']?? && val[hd['key']]!=''>'${hd['key']}':'${val[hd['key']]!''}',</#if>
																</#list>
																}
															</#assign>
															<td><#nested callbackParams?trim?replace(',\\s+}', '}','r')></td>
														</#if>
											<#else>
												&nbsp;
											</#if>
											</tr>
										</#list>
								</#if>
						</tbody>
					</table>
					<#if page?? && page?size gt 0>
						<!-- 分页开始 -->
						<div class="bs-component clearfix pull-right">
							<div id="page"></div>
						</div>
						<!-- 分页结束 -->
						<script type="text/javascript">
							/**初始化分页组件**/
							UC.ajaxPage("page", {
								totalPages : ${page.totalPages!0}, //总页数
								startPage : ${page.startPage!1}, //当前页
								count : ${page.count!0}, //总记录数
								onPageClick: function(event, thisPage){//thisPage选择的页码
									var m = '${page.onPageClick!""}';
									try{
										window[m](event, thisPage);
									}catch(e){
										try{
											window[m.substr(0,m.indexOf('('))](event, thisPage);
										}catch(e){
											console.log(m+'该函数未找到');
										}
									}
								}
							});
						</script>
					</#if>
				</div>
			</div>
</#macro>