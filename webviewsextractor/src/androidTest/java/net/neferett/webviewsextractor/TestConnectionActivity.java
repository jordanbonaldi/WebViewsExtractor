/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.AdapterView;
import android.widget.Toast;
import android.widget.Spinner;
import androidx.appcompat.app.AppCompatActivity;
import net.neferett.webviewsextractor.model.Model;
import net.neferett.webviewsinjector.response.ResponseCallback;
import net.neferett.webviewsinjector.response.ResponseEnum;
import net.neferett.webviewsinjector.services.LoginService;
import net.neferett.webviewsinjector.services.ServiceManager;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class TestConnectionActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    private LoginService loginService;
    private FrameLayout webview;
    private Button button;
    private EditText login;
    private EditText password;
    private ServiceManager serviceManager = new ServiceManager(this);

    private static String LOG = "DEBUG";

    private ArrayAdapter<String> loginServiceToAdapter() {
        ArrayList<String> stringArrayList = new ArrayList<>();

        this.serviceManager.loadServices();
        this.serviceManager.getServiceList().forEach(e -> stringArrayList.add(e.getName()));

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, stringArrayList);

        adapter.setDropDownViewResource(R.layout.support_simple_spinner_dropdown_item);

        return adapter;
    }

    private void loadViewComponents() {
        this.button = findViewById(R.id.button);
        password = findViewById(R.id.password);
        login = findViewById(R.id.login);
        webview = findViewById(R.id.webview);

        Spinner spinner = findViewById(R.id.spinner);
        spinner.setAdapter(this.loginServiceToAdapter());
        spinner.setOnItemSelectedListener(this);
    }

    private void extractDataOnService(LoginService loginService) {
        DataExtractor dataExtractor = new DataExtractor(loginService);

        dataExtractor.injectAll(TestConnectionActivity.this, (jsonArray, status) -> {
            try {
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject obj = jsonArray.getJSONObject(i);
                    JSONArray datas = obj.getJSONArray("data");
                    List<String> td = new ArrayList<>();
                    for (int j = 0; j < datas.length(); j++) {
                        td.add(datas.getString(j));
                    }
                    Model model = new Model(
                            obj.getString("title"),
                            obj.getString("type"),
                            obj.getString("value"),
                            td
                    );

                    Log.d(LOG, model.toString());

                }
                Log.d(LOG, String.valueOf(status));
                Log.d(LOG, String.valueOf(status.getFailedData()));
                Log.d(LOG, String.valueOf(status.getSucceedData()));
                Log.d(LOG, String.valueOf(status.getRemainingData()));
            } catch (Exception e) {
                Log.d(LOG, Objects.requireNonNull(e.getLocalizedMessage()));
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.test_login);

        this.loadViewComponents();

        button.setOnClickListener(view -> {
            String login = this.login.getEditableText().toString();
            String password = this.password.getEditableText().toString();

            loginService.autoLogin(
                    login,
                    password,
                    new ResponseCallback() {
                        @Override
                        public void getResponse(ResponseEnum responseEnum, String data) {
                            if (responseEnum == ResponseEnum.SUCCESS) {
                                Toast.makeText(TestConnectionActivity.this,
                                        "Successfully logged on " + loginService.getName(), Toast.LENGTH_LONG).show();
                                Log.d(LOG, "Successfully logged on " + loginService.getName());
                                extractDataOnService(loginService);
                            }
                        }
                    }
            );
            webview.removeAllViews();
            webview.addView(loginService.getWebview());
        });
    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
        this.loginService = this.serviceManager.get(i);
        Toast.makeText(getApplicationContext(), "Selected User: " + this.serviceManager.get(i).getName(),Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {}
}
