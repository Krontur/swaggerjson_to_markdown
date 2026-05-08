---
cssclasses:
  - swagger-api-doc
---

# Swagger Petstore

<div class="api-info-card">
  <div class="api-info-item"><span>Swagger Version</span><code>2.0</code></div>
  <div class="api-info-item"><span>API Version</span><code>1.0.7</code></div>
</div>

<div class="api-description">
This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
</div>

## Servers

<div class="api-servers">
  <div class="api-server">
    <code>https://petstore.swagger.io/v2</code>
  </div>
  <div class="api-server">
    <code>http://petstore.swagger.io/v2</code>
  </div>
</div>

# pet

<div class="api-tag-description">
Everything about your Pets
</div>

<a class="api-external-doc" href="http://swagger.io">Find out more</a>

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet/{petId}/uploadImage</code>
</div>

## uploads an image

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>petId</code> <strong class="api-required">required</strong><br>
        <code>integer($int64)</code><br>
        <code>(path)</code>
      </td>
      <td>ID of pet to update</td>
    </tr>
    <tr>
      <td>
        <code>additionalMetadata</code><br>
        <code>string</code><br>
        <code>(formData)</code>
      </td>
      <td>Additional data to pass to server</td>
    </tr>
    <tr>
      <td>
        <code>file</code><br>
        <code>file</code><br>
        <code>(formData)</code>
      </td>
      <td>file to upload</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
  <pre><code class="language-json">{
  &quot;code&quot;: 0,
  &quot;type&quot;: &quot;string&quot;,
  &quot;message&quot;: &quot;string&quot;
}</code></pre>
</div>

<div class="api-model-title">Model</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
  </tbody>
</table>


<div class="api-operation-separator"></div>

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet</code>
</div>

## Add a new pet to the store

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>body</code> <strong class="api-required">required</strong><br>
        <code>object</code><br>
        <code>(body)</code>
      </td>
      <td>Pet object that needs to be added to the store</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-request">Request Body</div>

<div class="api-operation-description">Pet object that needs to be added to the store</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>object</code></td>
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
      <td><code>array[object]</code></td>
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
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>object</code></td>
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
      <td><code>array[object]</code></td>
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
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>405</code></td>
      <td>Invalid input</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

<div class="api-operation api-put">
  <span class="api-method">PUT</span>
  <code class="api-path">/pet</code>
</div>

## Update an existing pet

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>body</code> <strong class="api-required">required</strong><br>
        <code>object</code><br>
        <code>(body)</code>
      </td>
      <td>Pet object that needs to be added to the store</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-request">Request Body</div>

<div class="api-operation-description">Pet object that needs to be added to the store</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>object</code></td>
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
      <td><code>array[object]</code></td>
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
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>object</code></td>
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
      <td><code>array[object]</code></td>
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
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>400</code></td>
      <td>Invalid ID supplied</td>
    </tr>
    <tr>
      <td><code>404</code></td>
      <td>Pet not found</td>
    </tr>
    <tr>
      <td><code>405</code></td>
      <td>Validation exception</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/pet/findByStatus</code>
</div>

## Finds Pets by status

<div class="api-operation-description">
Multiple status values can be provided with comma separated strings
</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>status</code> <strong class="api-required">required</strong><br>
        <code>array[string]</code><br>
        <code>(query)</code>
      </td>
      <td>Status values that need to be considered for filter</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
    <tr>
      <td><code>400</code></td>
      <td>Invalid status value</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
  <pre><code class="language-json">[
  {
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
  }
]</code></pre>
</div>

<div class="api-model-title">Model</div>

<div class="api-array-label">Array of:</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>object</code></td>
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
      <td><code>array[object]</code></td>
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


<div class="api-operation-separator"></div>

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/pet/findByTags</code>
</div>

## Finds Pets by tags

<div class="api-deprecated">
  <strong>Deprecated</strong>
  <span>This operation is deprecated.</span>
</div>

<div class="api-operation-description">
Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>tags</code> <strong class="api-required">required</strong><br>
        <code>array[string]</code><br>
        <code>(query)</code>
      </td>
      <td>Tags to filter by</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
    <tr>
      <td><code>400</code></td>
      <td>Invalid tag value</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
  <pre><code class="language-json">[
  {
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
  }
]</code></pre>
</div>

<div class="api-model-title">Model</div>

<div class="api-array-label">Array of:</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>object</code></td>
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
      <td><code>array[object]</code></td>
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


<div class="api-operation-separator"></div>

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/pet/{petId}</code>
</div>

## Find pet by ID

<div class="api-operation-description">
Returns a single pet
</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>petId</code> <strong class="api-required">required</strong><br>
        <code>integer($int64)</code><br>
        <code>(path)</code>
      </td>
      <td>ID of pet to return</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
    <tr>
      <td><code>400</code></td>
      <td>Invalid ID supplied</td>
    </tr>
    <tr>
      <td><code>404</code></td>
      <td>Pet not found</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
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

<div class="api-model-title">Model</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>object</code></td>
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
      <td><code>array[object]</code></td>
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


<div class="api-operation-separator"></div>

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet/{petId}</code>
</div>

## Updates a pet in the store with form data

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>petId</code> <strong class="api-required">required</strong><br>
        <code>integer($int64)</code><br>
        <code>(path)</code>
      </td>
      <td>ID of pet that needs to be updated</td>
    </tr>
    <tr>
      <td>
        <code>name</code><br>
        <code>string</code><br>
        <code>(formData)</code>
      </td>
      <td>Updated name of the pet</td>
    </tr>
    <tr>
      <td>
        <code>status</code><br>
        <code>string</code><br>
        <code>(formData)</code>
      </td>
      <td>Updated status of the pet</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>405</code></td>
      <td>Invalid input</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

<div class="api-operation api-delete">
  <span class="api-method">DELETE</span>
  <code class="api-path">/pet/{petId}</code>
</div>

## Deletes a pet

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>api_key</code><br>
        <code>string</code><br>
        <code>(header)</code>
      </td>
      <td>none</td>
    </tr>
    <tr>
      <td>
        <code>petId</code> <strong class="api-required">required</strong><br>
        <code>integer($int64)</code><br>
        <code>(path)</code>
      </td>
      <td>Pet id to delete</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>400</code></td>
      <td>Invalid ID supplied</td>
    </tr>
    <tr>
      <td><code>404</code></td>
      <td>Pet not found</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

# store

<div class="api-tag-description">
Access to Petstore orders
</div>

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/store/inventory</code>
</div>

## Returns pet inventories by status

<div class="api-operation-description">
Returns a map of status codes to quantities
</div>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
  <pre><code class="language-json">{}</code></pre>
</div>

<div class="api-model-title">Model</div>

<div class="api-primitive-schema"><code>object</code></div>


<div class="api-operation-separator"></div>

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/store/order</code>
</div>

## Place an order for a pet

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>body</code> <strong class="api-required">required</strong><br>
        <code>object</code><br>
        <code>(body)</code>
      </td>
      <td>order placed for purchasing the pet</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-request">Request Body</div>

<div class="api-operation-description">order placed for purchasing the pet</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>petId</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>quantity</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>shipDate</code></td>
      <td><code>string($date-time)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>Order Status</td>
    </tr>
    <tr>
      <td><code>complete</code></td>
      <td><code>boolean</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;petId&quot;: 0,
  &quot;quantity&quot;: 0,
  &quot;shipDate&quot;: &quot;2026-01-01T00:00:00Z&quot;,
  &quot;status&quot;: &quot;placed&quot;,
  &quot;complete&quot;: true
}</code></pre>
</div>


<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
    <tr>
      <td><code>400</code></td>
      <td>Invalid Order</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;petId&quot;: 0,
  &quot;quantity&quot;: 0,
  &quot;shipDate&quot;: &quot;2026-01-01T00:00:00Z&quot;,
  &quot;status&quot;: &quot;placed&quot;,
  &quot;complete&quot;: true
}</code></pre>
</div>

<div class="api-model-title">Model</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>petId</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>quantity</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>shipDate</code></td>
      <td><code>string($date-time)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>Order Status</td>
    </tr>
    <tr>
      <td><code>complete</code></td>
      <td><code>boolean</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
  </tbody>
</table>


<div class="api-operation-separator"></div>

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/store/order/{orderId}</code>
</div>

## Find purchase order by ID

<div class="api-operation-description">
For valid response try integer IDs with value &gt;= 1 and &lt;= 10. Other values will generated exceptions
</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>orderId</code> <strong class="api-required">required</strong><br>
        <code>integer($int64)</code><br>
        <code>(path)</code>
      </td>
      <td>ID of pet that needs to be fetched</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
    <tr>
      <td><code>400</code></td>
      <td>Invalid ID supplied</td>
    </tr>
    <tr>
      <td><code>404</code></td>
      <td>Order not found</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;petId&quot;: 0,
  &quot;quantity&quot;: 0,
  &quot;shipDate&quot;: &quot;2026-01-01T00:00:00Z&quot;,
  &quot;status&quot;: &quot;placed&quot;,
  &quot;complete&quot;: true
}</code></pre>
</div>

<div class="api-model-title">Model</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>petId</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>quantity</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>shipDate</code></td>
      <td><code>string($date-time)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>Order Status</td>
    </tr>
    <tr>
      <td><code>complete</code></td>
      <td><code>boolean</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
  </tbody>
</table>


<div class="api-operation-separator"></div>

<div class="api-operation api-delete">
  <span class="api-method">DELETE</span>
  <code class="api-path">/store/order/{orderId}</code>
</div>

## Delete purchase order by ID

<div class="api-operation-description">
For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>orderId</code> <strong class="api-required">required</strong><br>
        <code>integer($int64)</code><br>
        <code>(path)</code>
      </td>
      <td>ID of the order that needs to be deleted</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>400</code></td>
      <td>Invalid ID supplied</td>
    </tr>
    <tr>
      <td><code>404</code></td>
      <td>Order not found</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

# user

<div class="api-tag-description">
Operations about user
</div>

<a class="api-external-doc" href="http://swagger.io">Find out more about our store</a>

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/user/createWithList</code>
</div>

## Creates list of users with given input array

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>body</code> <strong class="api-required">required</strong><br>
        <code>array[object]</code><br>
        <code>(body)</code>
      </td>
      <td>List of user object</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-request">Request Body</div>

<div class="api-operation-description">List of user object</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<div class="api-array-label">Array of:</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>username</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>firstName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>lastName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>password</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>phone</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>userStatus</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>User Status</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">[
  {
    &quot;id&quot;: 0,
    &quot;username&quot;: &quot;string&quot;,
    &quot;firstName&quot;: &quot;string&quot;,
    &quot;lastName&quot;: &quot;string&quot;,
    &quot;email&quot;: &quot;string&quot;,
    &quot;password&quot;: &quot;string&quot;,
    &quot;phone&quot;: &quot;string&quot;,
    &quot;userStatus&quot;: 0
  }
]</code></pre>
</div>


<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default</code></td>
      <td>successful operation</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/user/{username}</code>
</div>

## Get user by user name

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>username</code> <strong class="api-required">required</strong><br>
        <code>string</code><br>
        <code>(path)</code>
      </td>
      <td>The name that needs to be fetched. Use user1 for testing. </td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
    <tr>
      <td><code>400</code></td>
      <td>Invalid username supplied</td>
    </tr>
    <tr>
      <td><code>404</code></td>
      <td>User not found</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;username&quot;: &quot;string&quot;,
  &quot;firstName&quot;: &quot;string&quot;,
  &quot;lastName&quot;: &quot;string&quot;,
  &quot;email&quot;: &quot;string&quot;,
  &quot;password&quot;: &quot;string&quot;,
  &quot;phone&quot;: &quot;string&quot;,
  &quot;userStatus&quot;: 0
}</code></pre>
</div>

<div class="api-model-title">Model</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>username</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>firstName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>lastName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>password</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>phone</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>userStatus</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>User Status</td>
    </tr>
  </tbody>
</table>


<div class="api-operation-separator"></div>

<div class="api-operation api-put">
  <span class="api-method">PUT</span>
  <code class="api-path">/user/{username}</code>
</div>

## Updated user

<div class="api-operation-description">
This can only be done by the logged in user.
</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>username</code> <strong class="api-required">required</strong><br>
        <code>string</code><br>
        <code>(path)</code>
      </td>
      <td>name that need to be updated</td>
    </tr>
    <tr>
      <td>
        <code>body</code> <strong class="api-required">required</strong><br>
        <code>object</code><br>
        <code>(body)</code>
      </td>
      <td>Updated user object</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-request">Request Body</div>

<div class="api-operation-description">Updated user object</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>username</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>firstName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>lastName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>password</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>phone</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>userStatus</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>User Status</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;username&quot;: &quot;string&quot;,
  &quot;firstName&quot;: &quot;string&quot;,
  &quot;lastName&quot;: &quot;string&quot;,
  &quot;email&quot;: &quot;string&quot;,
  &quot;password&quot;: &quot;string&quot;,
  &quot;phone&quot;: &quot;string&quot;,
  &quot;userStatus&quot;: 0
}</code></pre>
</div>


<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>400</code></td>
      <td>Invalid user supplied</td>
    </tr>
    <tr>
      <td><code>404</code></td>
      <td>User not found</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

<div class="api-operation api-delete">
  <span class="api-method">DELETE</span>
  <code class="api-path">/user/{username}</code>
</div>

## Delete user

<div class="api-operation-description">
This can only be done by the logged in user.
</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>username</code> <strong class="api-required">required</strong><br>
        <code>string</code><br>
        <code>(path)</code>
      </td>
      <td>The name that needs to be deleted</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>400</code></td>
      <td>Invalid username supplied</td>
    </tr>
    <tr>
      <td><code>404</code></td>
      <td>User not found</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/user/login</code>
</div>

## Logs user into the system

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>username</code> <strong class="api-required">required</strong><br>
        <code>string</code><br>
        <code>(query)</code>
      </td>
      <td>The user name for login</td>
    </tr>
    <tr>
      <td>
        <code>password</code> <strong class="api-required">required</strong><br>
        <code>string</code><br>
        <code>(query)</code>
      </td>
      <td>The password for login in clear text</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
    <tr>
      <td><code>400</code></td>
      <td>Invalid username/password supplied</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value - Status 200</div>
  <pre><code class="language-json">&quot;string&quot;</code></pre>
</div>

<div class="api-model-title">Model</div>

<div class="api-primitive-schema"><code>string</code></div>


<div class="api-operation-separator"></div>

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/user/logout</code>
</div>

## Logs out current logged in user session

<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default</code></td>
      <td>successful operation</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/user/createWithArray</code>
</div>

## Creates list of users with given input array

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>body</code> <strong class="api-required">required</strong><br>
        <code>array[object]</code><br>
        <code>(body)</code>
      </td>
      <td>List of user object</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-request">Request Body</div>

<div class="api-operation-description">List of user object</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<div class="api-array-label">Array of:</div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>username</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>firstName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>lastName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>password</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>phone</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>userStatus</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>User Status</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">[
  {
    &quot;id&quot;: 0,
    &quot;username&quot;: &quot;string&quot;,
    &quot;firstName&quot;: &quot;string&quot;,
    &quot;lastName&quot;: &quot;string&quot;,
    &quot;email&quot;: &quot;string&quot;,
    &quot;password&quot;: &quot;string&quot;,
    &quot;phone&quot;: &quot;string&quot;,
    &quot;userStatus&quot;: 0
  }
]</code></pre>
</div>


<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default</code></td>
      <td>successful operation</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/user</code>
</div>

## Create user

<div class="api-operation-description">
This can only be done by the logged in user.
</div>

<div class="api-section api-section-parameters">Parameters</div>

<table class="api-table api-parameters-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>body</code> <strong class="api-required">required</strong><br>
        <code>object</code><br>
        <code>(body)</code>
      </td>
      <td>Created user object</td>
    </tr>
  </tbody>
</table>

<div class="api-section api-section-request">Request Body</div>

<div class="api-operation-description">Created user object</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>username</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>firstName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>lastName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>password</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>phone</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>userStatus</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>User Status</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;username&quot;: &quot;string&quot;,
  &quot;firstName&quot;: &quot;string&quot;,
  &quot;lastName&quot;: &quot;string&quot;,
  &quot;email&quot;: &quot;string&quot;,
  &quot;password&quot;: &quot;string&quot;,
  &quot;phone&quot;: &quot;string&quot;,
  &quot;userStatus&quot;: 0
}</code></pre>
</div>


<div class="api-section api-section-responses">Responses</div>

<div class="api-content-type">Response content type: <code>application/json</code></div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default</code></td>
      <td>successful operation</td>
    </tr>
  </tbody>
</table>

<div class="api-operation-separator"></div>

# Schemas

## ApiResponse

<div class="api-schema-card">
<div class="api-content-type">Type: <code>object</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;code&quot;: 0,
  &quot;type&quot;: &quot;string&quot;,
  &quot;message&quot;: &quot;string&quot;
}</code></pre>
</div>

</div>

## Category

<div class="api-schema-card">
<div class="api-content-type">Type: <code>object</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;name&quot;: &quot;string&quot;
}</code></pre>
</div>

</div>

## Pet

<div class="api-schema-card">
<div class="api-content-type">Type: <code>object</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td><code>object</code></td>
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
      <td><code>array[object]</code></td>
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

</div>

## Tag

<div class="api-schema-card">
<div class="api-content-type">Type: <code>object</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;name&quot;: &quot;string&quot;
}</code></pre>
</div>

</div>

## Order

<div class="api-schema-card">
<div class="api-content-type">Type: <code>object</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>petId</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>quantity</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>shipDate</code></td>
      <td><code>string($date-time)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>Order Status</td>
    </tr>
    <tr>
      <td><code>complete</code></td>
      <td><code>boolean</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;petId&quot;: 0,
  &quot;quantity&quot;: 0,
  &quot;shipDate&quot;: &quot;2026-01-01T00:00:00Z&quot;,
  &quot;status&quot;: &quot;placed&quot;,
  &quot;complete&quot;: true
}</code></pre>
</div>

</div>

## User

<div class="api-schema-card">
<div class="api-content-type">Type: <code>object</code></div>

<table class="api-table api-schema-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>integer($int64)</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>username</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>firstName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>lastName</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>password</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>phone</code></td>
      <td><code>string</code></td>
      <td>no</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>userStatus</code></td>
      <td><code>integer($int32)</code></td>
      <td>no</td>
      <td>User Status</td>
    </tr>
  </tbody>
</table>

<div class="api-example">
  <div class="api-example-title">Example Value</div>
  <pre><code class="language-json">{
  &quot;id&quot;: 0,
  &quot;username&quot;: &quot;string&quot;,
  &quot;firstName&quot;: &quot;string&quot;,
  &quot;lastName&quot;: &quot;string&quot;,
  &quot;email&quot;: &quot;string&quot;,
  &quot;password&quot;: &quot;string&quot;,
  &quot;phone&quot;: &quot;string&quot;,
  &quot;userStatus&quot;: 0
}</code></pre>
</div>

</div>
