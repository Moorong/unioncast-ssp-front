<#--
<select><option></option></select>
-->
<#macro select
	list value="" multiple="" headerKey="" headerValue="" listKey="" listValue="" 
	label="" required="false" 
	id="" name="" class="" style="" size="" title="" disabled=""
	onclick="" ondblclick="" onmousedown="" onmouseup="" onmouseover="" onmousemove="" onmouseout="" onfocus="" onblur="" onkeypress="" onkeydown="" onkeyup="" onselect="" onchange=""
	>
<select<#rt/>
<#if id!=""> id="${id}"</#if><#rt/>
<#if multiple!=""> multiple="${multiple}"</#if><#rt/>
<#include "common-attributes.ftl"/><#rt/>
class="dropdown"
<#include "scripting-events.ftl"/><#rt/>
<#rt/>
<#nested>
</select>
</#macro>