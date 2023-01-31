<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiTest extends TestCase
{
	public function testFailedRegistration()
	{
		$userData = [
			"email" => "sergey@example.com",
			"password" => "password"
		];

		$this->json('POST', 'api/register', $userData, ['Accept' => 'application/json'])
			->assertStatus(404)
			->assertJson([
				"success" => false,
				"message" => "Validation Error.",
				"data" => [
					"name" => ["The name field is required."],
					"c_password" => ["The c password field is required."],
				]
			]);
	}

	public function testSuccessfulLogin()
	{
		$userData = [
			"email" => "sergey@example.com",
			"password" => "password"
		];

		$this->json('POST', 'api/login', $userData, ['Accept' => 'application/json'])
			->assertStatus(200)
			->assertJsonStructure([
				"success",
				"data" => [
					'uuid'
				],
				"message"
			]);
	}


	// 	public function testRequiredFieldsForRegistration()
	// 	{
	// 		$this->json('POST', 'api/register', ['Accept' => 'application/json'])
	// 			->assertStatus(404)
	// 			->assertJson([
	// 					"success" => false,
	// 					"message" => "Validation Error.",
	// 					"data" => [
	// 						"name" => [
	// 							"The name field is required."
	// 						],
	// 						"email" => [
	// 							"The email field is required."
	// 						],
	// 						"password" => [
	// 							"The password field is required."
	// 						],
	// 						"c_password" => [
	// 							"The c password field is required."
	// 						]
	// 					]
	// 						]);
	// 	}
}
