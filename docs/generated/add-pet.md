---
cssclasses:
  - swagger-api-doc
---

<!-- Generated API fragment. Insert this file in an Obsidian note that also uses cssclasses: swagger-api-doc. -->

<div class="api-fragment">

<div class="api-tag-title api-tag-title-fragment">pet</div>

<div class="api-tag-description">
Everything about your Pets
</div>

<a class="api-external-doc" href="http://swagger.io">Find out more</a>

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet</code>
</div>

<div class="api-operation-title">Add a new pet to the store</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead><tr><th>Name</th><th>Description</th></tr></thead>
  <tbody>
    <tr>
      <td><code>body</code> <strong class="api-required">required</strong><br><code>Pet</code><br><code>(body)</code></td>
      <td>Pet object that needs to be added to the store</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-request">Request Body</div>

<div class="api-operation-description">Pet object that needs to be added to the store</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<table class="api-table api-schema-table">
  <thead><tr><th>Property</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>Category</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td><span class="api-required">yes</span></td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>photoUrls</code></td>
      <td><code>array[string]</code></td>
      <td><span class="api-required">yes</span></td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td><code>array[Tag]</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>pet status in the store</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;category&quot;: {
    &quot;id&quot;: 0,
    &quot;name&quot;: &quot;string&quot;
  },
  &quot;name&quot;: &quot;doggie&quot;,
  &quot;photoUrls&quot;: [
    &quot;string&quot;
  ],
  &quot;tags&quot;: [
    {
      &quot;id&quot;: 0,
      &quot;name&quot;: &quot;string&quot;
    }
  ],
  &quot;status&quot;: &quot;available&quot;
}</code></pre>
</div>

<div class="api-content-type">Content-Type: <code>application/xml</code></div>

<table class="api-table api-schema-table">
  <thead><tr><th>Property</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>Category</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td><span class="api-required">yes</span></td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>photoUrls</code></td>
      <td><code>array[string]</code></td>
      <td><span class="api-required">yes</span></td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td><code>array[Tag]</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>pet status in the store</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-xml">&lt;!-- XML example not generated --&gt;</code></pre>
</div>


<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead><tr><th>Code</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td><code>405</code></td><td>Invalid input</td></tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

</div>
